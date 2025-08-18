"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Send } from "lucide-react";
import { MessageList } from "@/components/whatsapp/message-list";
import { TemplateSender } from "@/components/whatsapp/template-sender";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: string;
  type: "incoming" | "outgoing";
  templateName?: string;
}

interface Template {
  name: string;
  language: {
    code: string;
  };
  components: any[];
}

export default function WhatsAppPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [messagesRes, templatesRes] = await Promise.all([
          fetch("/api/whatsapp/messages"),
          fetch("/api/whatsapp/templates"),
        ]);

        if (!messagesRes.ok || !templatesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [messagesData, templatesData] = await Promise.all([
          messagesRes.json(),
          templatesRes.json(),
        ]);

        setMessages(messagesData);
        setTemplates(templatesData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load WhatsApp data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSendTemplate = async (to: string, template: Template) => {
    try {
      const response = await fetch("/api/whatsapp/templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, template }),
      });

      if (!response.ok) {
        throw new Error("Failed to send template message");
      }

      toast.success("Template message sent successfully");

      // Refresh messages
      const messagesRes = await fetch("/api/whatsapp/messages");
      if (messagesRes.ok) {
        const messagesData = await messagesRes.json();
        setMessages(messagesData);
      }
    } catch (error) {
      toast.error("Failed to send template message");
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch("/api/whatsapp/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: "242068801986", text: newMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setNewMessage("");
      toast.success("Message sent successfully");

      // Refresh messages
      const messagesRes = await fetch("/api/whatsapp/messages");
      if (messagesRes.ok) {
        const messagesData = await messagesRes.json();
        setMessages(messagesData);
      }
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">WhatsApp Business</h1>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="send" className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Send Message
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Message History</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">Loading messages...</p>
              ) : (
                <MessageList messages={messages} />
              )}
              <div className="mt-4 flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">Loading templates...</p>
              ) : (
                <TemplateSender
                  templates={templates}
                  onSend={handleSendTemplate}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="send">
          <Card>
            <CardHeader>
              <CardTitle>Send Message</CardTitle>
            </CardHeader>
            <CardContent>
              <TemplateSender
                templates={templates}
                onSend={handleSendTemplate}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
