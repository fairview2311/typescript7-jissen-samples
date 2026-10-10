CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`title` text NOT NULL,
	`due_date` text,
	`status` text NOT NULL,
	`priority` text NOT NULL,
	`estimate_minutes` integer NOT NULL
);
