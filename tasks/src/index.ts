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

function findTask(list: Task[], id: number): Task | undefined {
  return list.find((task) => task.id === id);
}

console.log(`id 2: ${findTask(tasks, 2)?.title ?? "見つかりません"}`);
console.log(`id 9: ${findTask(tasks, 9)?.title ?? "見つかりません"}`);

type ParseResult = { ok: true; task: Task } | { ok: false; error: string };

const isTaskStatus = (value: unknown): value is TaskStatus =>
  value === "todo" || value === "doing" || value === "done";

const isPriority = (value: unknown): value is Priority =>
  value === "high" || value === "medium" || value === "low";

function parseTask(value: unknown): ParseResult {
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

function parseTasksJson(text: string): Task[] {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(`JSON として読めません: ${message}`);
    return [];
  }
  if (!Array.isArray(raw)) {
    console.log("タスクの配列ではありません");
    return [];
  }
  const result: Task[] = [];
  raw.forEach((item: unknown, index) => {
    const parsed = parseTask(item);
    if (parsed.ok) {
      result.push(parsed.task);
    } else {
      console.log(`${index + 1} 件目を読み飛ばします: ${parsed.error}`);
    }
  });
  return result;
}

const input = `[
  { "id": 6, "title": "洗濯する", "status": "todo",
    "priority": "low", "estimateMinutes": 20 },
  { "id": 7, "title": "", "status": "todo",
    "priority": "high", "estimateMinutes": 5 },
  { "id": 8, "title": "電気代を払う", "status": "dnoe",
    "priority": "high", "estimateMinutes": 5 }
]`;
printTasks("読み込んだタスク", parseTasksJson(input));
parseTasksJson("[{ 壊れた JSON");
