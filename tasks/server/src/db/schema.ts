import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tasksTable = sqliteTable("tasks", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  dueDate: text("due_date"),
  status: text({ enum: ["todo", "doing", "done"] }).notNull(),
  priority: text({ enum: ["high", "medium", "low"] }).notNull(),
  estimateMinutes: integer("estimate_minutes").notNull(),
});

export type TaskRow = typeof tasksTable.$inferSelect;
