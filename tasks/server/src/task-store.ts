import { eq } from "drizzle-orm";
import type { Task, TaskStatus } from "@tasks/shared";
import { db } from "./db/client.ts";
import { tasksTable, type TaskRow } from "./db/schema.ts";

function toTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    dueDate: row.dueDate ?? undefined,
    status: row.status,
    priority: row.priority,
    estimateMinutes: row.estimateMinutes,
  };
}

function toValues(task: Task) {
  return {
    title: task.title,
    dueDate: task.dueDate ?? null,
    status: task.status,
    priority: task.priority,
    estimateMinutes: task.estimateMinutes,
  };
}

export async function listTasks(status?: TaskStatus): Promise<Task[]> {
  const rows =
    status === undefined
      ? await db.select().from(tasksTable)
      : await db.select().from(tasksTable).where(eq(tasksTable.status, status));
  return rows.map(toTask);
}

export async function getTask(id: number): Promise<Task | undefined> {
  const rows = await db.select().from(tasksTable).where(eq(tasksTable.id, id));
  const row = rows[0];
  return row === undefined ? undefined : toTask(row);
}

export async function addTask(task: Task): Promise<Task> {
  const rows = await db.insert(tasksTable).values(toValues(task)).returning();
  return toTask(rows[0]);
}

export async function updateTask(task: Task): Promise<Task | undefined> {
  const rows = await db
    .update(tasksTable)
    .set(toValues(task))
    .where(eq(tasksTable.id, task.id))
    .returning();
  const row = rows[0];
  return row === undefined ? undefined : toTask(row);
}

export async function deleteTask(id: number): Promise<boolean> {
  const rows = await db.delete(tasksTable).where(eq(tasksTable.id, id)).returning();
  return rows.length > 0;
}

export async function seedIfEmpty(tasks: Task[]): Promise<void> {
  const rows = await db.select().from(tasksTable).limit(1);
  if (rows.length === 0) {
    await db.insert(tasksTable).values(tasks.map(toValues));
  }
}
