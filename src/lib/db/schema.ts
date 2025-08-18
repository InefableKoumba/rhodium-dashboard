import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const whatsappMessages = sqliteTable("whatsapp_messages", {
  id: text("id").primaryKey(),
  messageId: text("message_id").unique().notNull(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  type: text("type").notNull(),
  content: text("content").notNull(),
  templateName: text("template_name"),
  timestamp: integer("timestamp", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  direction: text("direction").notNull(),
  status: text("status").notNull(),
  metadata: text("metadata"),
});
