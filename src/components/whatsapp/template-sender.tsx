"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";

interface TemplateSenderProps {
  onSend: (to: string, template: string) => Promise<void>;
}

export function TemplateSender({ onSend }: TemplateSenderProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!phoneNumber || !selectedTemplate) return;

    try {
      setIsSending(true);
      await onSend(phoneNumber, selectedTemplate);
      setPhoneNumber("");
      setSelectedTemplate("");
    } catch (error) {
      console.error("Failed to send template message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="space-y-2">
          <span>Phone Number</span>
          <Input
            id="phone"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <span>Template</span>
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger>
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="template1">Template 1</SelectItem>
              <SelectItem value="template2">Template 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedTemplate && (
        <Card className="p-4 bg-gray-50 dark:bg-gray-800">
          <pre className="text-sm overflow-auto">
            {JSON.stringify({ name: selectedTemplate }, null, 2)}
          </pre>
        </Card>
      )}

      <Button
        className="w-full"
        onClick={handleSend}
        disabled={!phoneNumber || !selectedTemplate || isSending}
      >
        <Send className="w-4 h-4 mr-2" />
        {isSending ? "Sending..." : "Send Template Message"}
      </Button>
    </div>
  );
}
