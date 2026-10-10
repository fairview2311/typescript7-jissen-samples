// 画面で使うタスクの型（第12章で shared の型に置き換える）
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
