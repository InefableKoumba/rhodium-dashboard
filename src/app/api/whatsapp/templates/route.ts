import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { WhatsAppService } from "@/lib/services/whatsapp";

const whatsappService = new WhatsAppService(
  process.env.WHATSAPP_API_URL || "",
  process.env.WHATSAPP_ACCESS_TOKEN || ""
);

export async function GET() {
  try {
    let templates = await prisma.whatsAppTemplate.findMany();

    if (templates.length === 0) {
      const apiTemplates = await whatsappService.getTemplates();
      templates = await Promise.all(
        apiTemplates.map((template: any) =>
          prisma.whatsAppTemplate.create({
            data: {
              name: template.name,
              language: template.language.code,
              components: JSON.stringify(template.components),
            },
          })
        )
      );
    }

    return NextResponse.json(
      templates.map((template) => ({
        name: template.name,
        language: { code: template.language },
        components: JSON.parse(template.components),
      }))
    );
  } catch (error) {
    console.error("Failed to fetch templates:", error);
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}

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
