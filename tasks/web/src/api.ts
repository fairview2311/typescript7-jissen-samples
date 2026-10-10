import type { Task, TaskStatus } from "./types.ts";

export type NewTask = {
  title: string;
  dueDate?: string;
  priority: Task["priority"];
  estimateMinutes: number;
};

async function check(response: Response): Promise<Response> {
  if (!response.ok) {
    throw new Error(`API がエラーを返しました: ${response.status}`);
  }
  return response;
}

export async function fetchTasks(): Promise<Task[]> {
  const response = await check(await fetch("/api/tasks"));
  const tasks: Task[] = await response.json();
  return tasks;
}

export async function createTask(task: NewTask): Promise<Task> {
  const response = await check(
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, status: "todo" }),
    }),
  );
  return response.json();
}

export async function changeStatus(id: number, status: TaskStatus): Promise<Task> {
  const response = await check(
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }),
  );
  return response.json();
}

export async function removeTask(id: number): Promise<void> {
  await check(await fetch(`/api/tasks/${id}`, { method: "DELETE" }));
}
