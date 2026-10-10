export type TaskStatus = "todo" | "doing" | "done";
export type Priority = "high" | "medium" | "low";

export type Task = {
  id: number;
  title: string;
  dueDate?: string;
  status: TaskStatus;
  priority: Priority;
  estimateMinutes: number;
};

export type ParseResult = { ok: true; task: Task } | { ok: false; error: string };

export const isTaskStatus = (value: unknown): value is TaskStatus =>
  value === "todo" || value === "doing" || value === "done";

export const isPriority = (value: unknown): value is Priority =>
  value === "high" || value === "medium" || value === "low";

export function parseTask(value: unknown): ParseResult {
  if (typeof value !== "object" || value === null) {
    return { ok: false, error: "オブジェクトではありません" };
  }
  const data = value as Record<string, unknown>;
  if (typeof data.id !== "number") {
    return { ok: false, error: "id が数値ではありません" };
  }
  if (typeof data.title !== "string" || data.title === "") {
    return { ok: false, error: "title が空です" };
  }
  if (data.dueDate !== undefined && typeof data.dueDate !== "string") {
    return { ok: false, error: "dueDate が文字列ではありません" };
  }
  if (!isTaskStatus(data.status)) {
    return { ok: false, error: `status が違います（${String(data.status)}）` };
  }
  if (!isPriority(data.priority)) {
    return { ok: false, error: `priority が違います（${String(data.priority)}）` };
  }
  if (typeof data.estimateMinutes !== "number") {
    return { ok: false, error: "estimateMinutes が数値ではありません" };
  }
  return {
    ok: true,
    task: {
      id: data.id,
      title: data.title,
      dueDate: data.dueDate,
      status: data.status,
      priority: data.priority,
      estimateMinutes: data.estimateMinutes,
    },
  };
}
