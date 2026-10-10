import { parseTask, type Task, type TaskStatus } from "@tasks/shared";
import { sampleTasks } from "./sample-tasks.ts";
import {
  filterUndone,
  findTask,
  printTasks,
  sortByDueDate,
  statusLabel,
} from "./task-list.ts";

const undone = filterUndone(sampleTasks);
printTasks("未完了を期限の近い順に", sortByDueDate(undone));

const statuses: TaskStatus[] = ["doing", "todo", "done"];
for (const status of statuses) {
  printTasks(statusLabel(status), sampleTasks.filter((task) => task.status === status));
}

console.log(`id 2: ${findTask(sampleTasks, 2)?.title ?? "見つかりません"}`);
console.log(`id 9: ${findTask(sampleTasks, 9)?.title ?? "見つかりません"}`);

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
