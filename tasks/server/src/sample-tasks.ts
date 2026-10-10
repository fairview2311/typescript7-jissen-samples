import type { Task } from "@tasks/shared";

export const sampleTasks: Task[] = [
  {
    id: 1,
    title: "牛乳を買う",
    dueDate: "2026-10-12",
    status: "todo",
    priority: "medium",
    estimateMinutes: 15,
  },
  {
    id: 2,
    title: "本の原稿を書く",
    dueDate: "2026-10-20",
    status: "doing",
    priority: "high",
    estimateMinutes: 120,
  },
  {
    id: 3,
    title: "歯医者を予約する",
    status: "done",
    priority: "medium",
    estimateMinutes: 10,
  },
  {
    id: 4,
    title: "部屋を片付ける",
    dueDate: "2026-10-11",
    status: "todo",
    priority: "low",
    estimateMinutes: 30,
  },
  {
    id: 5,
    title: "TypeScript の本を読む",
    status: "doing",
    priority: "high",
    estimateMinutes: 60,
  },
];
