CREATE TABLE `whatsapp_messages` (
	`id` text PRIMARY KEY NOT NULL,
	`message_id` text NOT NULL,
	`from` text NOT NULL,
	`to` text NOT NULL,
	`type` text NOT NULL,
	`content` text NOT NULL,
	`template_name` text,
	`timestamp` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`direction` text NOT NULL,
	`status` text NOT NULL,
	`metadata` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `whatsapp_messages_message_id_unique` ON `whatsapp_messages` (`message_id`);