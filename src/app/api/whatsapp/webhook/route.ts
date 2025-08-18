import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "crypto";

// Verify that the request is coming from WhatsApp
function verifyWhatsAppSignature(
  signature: string,
  body: string,
  appSecret: string
): boolean {
  const hmac = crypto
    .createHmac("sha256", appSecret)
    .update(body)
    .digest("hex");

  return signature === `sha256=${hmac}`;
}

export async function POST(request: NextRequest) {
  try {
    // Get the raw request body as text
    const rawBody = await request.text();
    console.log(rawBody);
    // Verify the request signature
    const signature = request.headers.get("x-hub-signature-256");
    const appSecret = process.env.WHATSAPP_APP_SECRET;

    if (
      !signature ||
      !appSecret ||
      !verifyWhatsAppSignature(signature, rawBody, appSecret)
    ) {
      console.log("Invalid signature", signature, appSecret);
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Parse the body
    const body = JSON.parse(rawBody);
    console.log(body);

    // Handle different types of notifications
    if (body.object === "whatsapp_business_account") {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.field === "messages") {
            for (const message of change.value.messages) {
              // Store the message in the database
              await prisma.whatsAppMessage.create({
                data: {
                  messageId: message.id,
                  from: message.from,
                  to: message.to,
                  type: message.type,
                  content:
                    message.type === "text"
                      ? message.text.body
                      : JSON.stringify(message),
                  templateName:
                    message.type === "template" ? message.template.name : null,
                  direction: "incoming",
                  status: message.status || "received",
                  metadata: JSON.stringify(message),
                },
              });
            }
          }

          // Handle status updates
          if (change.field === "message_status") {
            const status = change.value;
            await prisma.whatsAppMessage.update({
              where: { messageId: status.id },
              data: { status: status.status },
            });
          }
        }
      }

      // Acknowledge the webhook
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Unsupported notification type" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle the webhook verification request
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  // Log the full URL and all search parameters
  console.log("Webhook verification request URL:", request.nextUrl.toString());
  console.log(
    "All search parameters:",
    Object.fromEntries(searchParams.entries())
  );
  console.log("Required parameters:", {
    "hub.mode": mode,
    "hub.verify_token": token,
    "hub.challenge": challenge,
    expectedToken: process.env.WHATSAPP_VERIFY_TOKEN,
  });

  // Verify the webhook
  if (!mode || !token || !challenge) {
    console.log("Missing required parameters");
    return new Response("Missing required parameters", { status: 400 });
  }

  if (mode !== "subscribe") {
    console.log("Invalid mode:", mode);
    return new Response("Invalid mode", { status: 400 });
  }

  if (token !== process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log("Token mismatch:", {
      received: token,
      expected: process.env.WHATSAPP_VERIFY_TOKEN,
    });
    return new Response("Invalid verify token", { status: 403 });
  }

  // All checks passed, return the challenge
  console.log("Webhook verified successfully");
  return new Response(challenge, { status: 200 });
}
