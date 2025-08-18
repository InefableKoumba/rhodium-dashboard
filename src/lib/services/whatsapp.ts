import { prisma } from "@/lib/db";

interface WhatsAppMessage {
  messaging_product: string;
  to: string;
  type: string;
  template?: {
    name: string;
    language: {
      code: string;
    };
    components: any[];
  };
  text?: {
    body: string;
  };
}

export class WhatsAppService {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accessToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accessToken;
  }

  async sendTemplateMessage(to: string, template: WhatsAppMessage["template"]) {
    if (!template) throw new Error("Template is required");

    const message: WhatsAppMessage = {
      messaging_product: "whatsapp",
      to,
      type: "template",
      template,
    };

    const response = await this.sendMessage(message);

    // Store the sent message in the local database
    await prisma.whatsAppMessage.create({
      data: {
        messageId: response.messages[0].id,
        from: process.env.WHATSAPP_PHONE_NUMBER || "",
        to,
        type: "template",
        content: JSON.stringify(template),
        templateName: template.name,
        direction: "outgoing",
        status: "sent",
        metadata: JSON.stringify(response),
      },
    });

    return response;
  }

  async sendTextMessage(to: string, text: string) {
    const message: WhatsAppMessage = {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: {
        body: text,
      },
    };

    const response = await this.sendMessage(message);

    // Store the sent message in the local database
    await prisma.whatsAppMessage.create({
      data: {
        messageId: response.messages[0].id,
        from: process.env.WHATSAPP_PHONE_NUMBER || "",
        to,
        type: "text",
        content: text,
        direction: "outgoing",
        status: "sent",
        metadata: JSON.stringify(response),
      },
    });

    return response;
  }

  private async sendMessage(message: WhatsAppMessage) {
    try {
      const response = await fetch(`${this.apiUrl}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to send message");
      }

      return await response.json();
    } catch (error) {
      console.error("WhatsApp API Error:", error);
      throw error;
    }
  }

  async getMessageHistory() {
    try {
      // Fetch messages from local database
      const messages = await prisma.whatsAppMessage.findMany({
        orderBy: {
          timestamp: "desc",
        },
        take: 100, // Limit to last 100 messages
      });

      return messages.map((msg: any) => ({
        id: msg.messageId,
        content: msg.content,
        timestamp: msg.timestamp.toISOString(),
        sender: msg.from,
        type: msg.direction === "incoming" ? "incoming" : "outgoing",
        templateName: msg.templateName,
      }));
    } catch (error) {
      console.error("Failed to fetch message history:", error);
      throw error;
    }
  }

  async getTemplates() {
    try {
      // First try to fetch from local database
      let templates = await prisma.whatsAppTemplate.findMany();

      return templates.map((template: any) => ({
        name: template.name,
        language: { code: template.language },
        components: JSON.parse(template.components),
      }));
    } catch (error) {
      console.error("Failed to fetch templates:", error);
      throw error;
    }
  }
}
