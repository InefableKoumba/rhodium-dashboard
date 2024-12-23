CREATE TABLE `users` (
	`cuid` text PRIMARY KEY NOT NULL,
	`firstname` text(255) NOT NULL,
	`lastname` text(255) NOT NULL,
	`password` text(255) NOT NULL,
	`email` text(255) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `email` ON `users` (`email`);