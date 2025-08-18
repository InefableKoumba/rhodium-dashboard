import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { WhatsAppService } from "@/lib/services/whatsapp";
import { whatsappMessages } from "@/lib/db/schema";
import { db } from "@/lib/db/index";

const whatsappService = new WhatsAppService(
  process.env.WHATSAPP_API_URL || "",
  process.env.WHATSAPP_ACCESS_TOKEN || ""
);

export async function GET() {
  try {
    const messages = await db
      .select()
      .from(whatsappMessages)
      .orderBy(desc(whatsappMessages.timestamp))
      .limit(100);

    return NextResponse.json(
      messages.map((msg: typeof whatsappMessages.$inferSelect) => ({
        id: msg.messageId,
        content: msg.content,
        timestamp: msg.timestamp.toISOString(),
        sender: msg.from,
        type: msg.direction === "incoming" ? "incoming" : "outgoing",
        templateName: msg.templateName,
      }))
    );
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { to, text } = await request.json();

    if (!to || !text) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await whatsappService.sendTextMessage(to, text);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to send message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
