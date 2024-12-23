DROP INDEX `email`;--> statement-breakpoint
CREATE UNIQUE INDEX `emailUniqueIndex` ON `users` (lower("email"));