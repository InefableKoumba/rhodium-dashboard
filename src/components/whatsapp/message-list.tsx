"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: string;
  type: "incoming" | "outgoing";
  templateName?: string;
}

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-2",
              message.type === "outgoing" && "flex-row-reverse"
            )}
          >
            <Avatar className="w-8 h-8" />
            <div
              className={cn(
                "rounded-lg p-3 max-w-[70%]",
                message.type === "incoming"
                  ? "bg-gray-100 dark:bg-gray-800"
                  : "bg-blue-500 text-white"
              )}
            >
              {message.templateName && (
                <div className="text-xs opacity-70 mb-1">
                  Template: {message.templateName}
                </div>
              )}
              <p className="text-sm">{message.content}</p>
              <div
                className={cn(
                  "text-xs mt-1",
                  message.type === "incoming"
                    ? "text-gray-500 dark:text-gray-400"
                    : "text-blue-100"
                )}
              >
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
