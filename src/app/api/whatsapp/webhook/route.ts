import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { whatsappMessages } from "@/lib/db/schema";
import { db } from "@/lib/db/index";

// Verify that the request is coming from WhatsApp
function verifyWhatsAppSignature(
  signature: string,
  body: string,
  appSecret: string
): boolean {
  try {
    const hmac = crypto
      .createHmac("sha256", appSecret)
      .update(body)
      .digest("hex");

    const expectedSignature = `sha256=${hmac}`;

    return signature === expectedSignature;
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the raw request body as text
    const rawBody = await request.text();
    // Log all headers for debugging

    // Verify the request signature
    const signature = request.headers.get("x-hub-signature-256");
    const appSecret = process.env.WHATSAPP_APP_SECRET;

    if (!signature || !appSecret) {
      return NextResponse.json(
        { error: "Missing signature or app secret" },
        { status: 401 }
      );
    }

    if (!verifyWhatsAppSignature(signature, rawBody, appSecret)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Parse the body
    const body = JSON.parse(rawBody);

    // Handle different types of notifications
    if (body.object === "whatsapp_business_account") {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.field === "messages") {
            for (const message of change.value.messages) {
              // Store the message in the database
              await db.insert(whatsappMessages).values({
                id: uuidv4(),
                messageId: message.id,
                from: message.from,
                to: "242064841864",
                type: message.type,
                content:
                  message.type === "text"
                    ? message.text.body
                    : JSON.stringify(message),
                templateName:
                  message.type === "template" ? message.template.name : null,
                direction: "incoming",
                status: "received", // always for incoming messages
                timestamp: new Date(Number(message.timestamp) * 1000), // convert UNIX to Date
                metadata: JSON.stringify(message),
              });
            }
          }

          // Handle status updates
          if (change.field === "message_status") {
            const status = change.value;
            await db
              .update(whatsappMessages)
              .set({ status: status.status })
              .where(eq(whatsappMessages.messageId, status.id));
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

  // Verify the webhook
  if (!mode || !token || !challenge) {
    return new Response("Missing required parameters", { status: 400 });
  }

  if (mode !== "subscribe") {
    return new Response("Invalid mode", { status: 400 });
  }

  if (token !== process.env.WHATSAPP_VERIFY_TOKEN) {
    return new Response("Invalid verify token", { status: 403 });
  }

  // All checks passed, return the challenge
  console.log("Webhook verified successfully");
  return new Response(challenge, { status: 200 });
}
