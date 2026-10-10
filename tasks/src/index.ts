function makeGreeting(name: string) {
  return `こんにちは、${name} です`;
}

const appName: string = "tasks";
console.log(makeGreeting(appName));

type TaskStatus = "todo" | "doing" | "done";
type Priority = "high" | "medium" | "low";

type Task = {
  id: number;
  title: string;
  dueDate?: string;
  status: TaskStatus;
  priority: Priority;
  estimateMinutes: number;
};

const tasks: Task[] = [
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

function statusLabel(status: TaskStatus): string {
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

function priorityLabel(priority: Priority): string {
  if (priority === "high") {
    return "高";
  }
  if (priority === "medium") {
    return "中";
  }
  return "低";
}

function formatTask(task: Task): string {
  const status = statusLabel(task.status);
  const due = task.dueDate ?? "期限なし";
  const priority = priorityLabel(task.priority);
  const details = `${due}、${task.estimateMinutes} 分、優先度 ${priority}`;
  return `[${status}] ${task.id}. ${task.title}（${details}）`;
}

function printTasks(label: string, list: Task[]): void {
  console.log(`--- ${label} ---`);
  for (const task of list) {
    console.log(formatTask(task));
  }
}

const filterUndone = (list: Task[]): Task[] => {
  return list.filter((task) => task.status !== "done");
};

const dueKey = (task: Task): string => task.dueDate ?? "9999-12-31";

const sortByDueDate = (list: Task[]): Task[] => {
  return [...list].sort((a, b) => dueKey(a).localeCompare(dueKey(b)));
};

const undone = filterUndone(tasks);
printTasks("未完了を期限の近い順に", sortByDueDate(undone));

const statuses: TaskStatus[] = ["doing", "todo", "done"];
for (const status of statuses) {
  printTasks(statusLabel(status), tasks.filter((task) => task.status === status));
}
