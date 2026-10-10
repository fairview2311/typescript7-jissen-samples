import assert from "node:assert/strict";
import { test } from "node:test";
import type { Task } from "@tasks/shared";
import { filterUndone, sortByDueDate } from "./task-list.ts";

const base: Task = {
  id: 1,
  title: "テスト",
  status: "todo",
  priority: "medium",
  estimateMinutes: 10,
};

const list: Task[] = [
  { ...base, id: 1, dueDate: "2026-10-20" },
  { ...base, id: 2 },
  { ...base, id: 3, dueDate: "2026-10-12", status: "done" },
];

test("sortByDueDate は期限の近い順に並べ、期限なしを最後にする", () => {
  const ids = sortByDueDate(list).map((task) => task.id);
  assert.deepEqual(ids, [3, 1, 2]);
});

test("sortByDueDate は元の配列を並べ替えない", () => {
  sortByDueDate(list);
  assert.deepEqual(
    list.map((task) => task.id),
    [1, 2, 3],
  );
});

test("filterUndone は完了したタスクを除く", () => {
  const ids = filterUndone(list).map((task) => task.id);
  assert.deepEqual(ids, [1, 2]);
});
