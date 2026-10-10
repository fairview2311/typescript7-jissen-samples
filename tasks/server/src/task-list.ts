import type { Priority, Task, TaskStatus } from "@tasks/shared";

export function statusLabel(status: TaskStatus): string {
  switch (status) {
    case "todo":
      return "未着手";
    case "doing":
      return "作業中";
    case "done":
      return "完了";
    default: {
      const unreachable: never = status;
      return unreachable;
    }
  }
}

export function priorityLabel(priority: Priority): string {
  if (priority === "high") {
    return "高";
  }
  if (priority === "medium") {
    return "中";
  }
  return "低";
}

export function formatTask(task: Task): string {
  const status = statusLabel(task.status);
  const due = task.dueDate ?? "期限なし";
  const priority = priorityLabel(task.priority);
  const details = `${due}、${task.estimateMinutes} 分、優先度 ${priority}`;
  return `[${status}] ${task.id}. ${task.title}（${details}）`;
}

export function printTasks(label: string, list: Task[]): void {
  console.log(`--- ${label} ---`);
  for (const task of list) {
    console.log(formatTask(task));
  }
}

export const filterUndone = (list: Task[]): Task[] => {
  return list.filter((task) => task.status !== "done");
};

export const dueKey = (task: Task): string => task.dueDate ?? "9999-12-31";

export const sortByDueDate = (list: Task[]): Task[] => {
  return [...list].sort((a, b) => dueKey(a).localeCompare(dueKey(b)));
};

export function findTask(list: Task[], id: number): Task | undefined {
  return list.find((task) => task.id === id);
}
