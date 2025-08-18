import { NextRequest, NextResponse } from "next/server";
import { WhatsAppService } from "@/lib/services/whatsapp";

const whatsappService = new WhatsAppService(
  process.env.WHATSAPP_API_URL || "",
  process.env.WHATSAPP_ACCESS_TOKEN || ""
);

export async function POST(request: NextRequest) {
  try {
    const { to, template } = await request.json();

    if (!to || !template) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await whatsappService.sendTemplateMessage(to, template);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to send template message:", error);
    return NextResponse.json(
      { error: "Failed to send template message" },
      { status: 500 }
    );
  }
}
