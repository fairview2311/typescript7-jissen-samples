import { parseTask } from "@tasks/shared";
import type { Task, TaskStatus } from "./types.ts";

export type NewTask = Omit<Task, "id" | "status">;

type Parse<T> = (value: unknown) => T;

async function request<T>(path: string, parse: Parse<T>, init?: RequestInit): Promise<T> {
  const response = await fetch(path, init);
  if (!response.ok) {
    throw new Error(`API がエラーを返しました: ${response.status}`);
  }
  const body: unknown = await response.json();
  return parse(body);
}

const toTask: Parse<Task> = (value) => {
  const parsed = parseTask(value);
  if (!parsed.ok) {
    throw new Error(`API の答えがタスクの形ではありません: ${parsed.error}`);
  }
  return parsed.task;
};

const toTasks: Parse<Task[]> = (value) => {
  if (!Array.isArray(value)) {
    throw new Error("API の答えが配列ではありません");
  }
  return value.map(toTask);
};

const sendJson = (method: string, body: unknown): RequestInit => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export function fetchTasks(): Promise<Task[]> {
  return request("/api/tasks", toTasks);
}

export function createTask(task: NewTask): Promise<Task> {
  return request("/api/tasks", toTask, sendJson("POST", { ...task, status: "todo" }));
}

export function changeStatus(id: number, status: TaskStatus): Promise<Task> {
  return request(`/api/tasks/${id}`, toTask, sendJson("PATCH", { status }));
}

export async function removeTask(id: number): Promise<void> {
  const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(`API がエラーを返しました: ${response.status}`);
  }
}
