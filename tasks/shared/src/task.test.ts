import assert from "node:assert/strict";
import { test } from "node:test";
import { parseTask } from "./task.ts";

test("正しい形なら Task を返す", () => {
  const result = parseTask({
    id: 1,
    title: "牛乳を買う",
    status: "todo",
    priority: "high",
    estimateMinutes: 15,
  });
  assert.deepEqual(result, {
    ok: true,
    task: {
      id: 1,
      title: "牛乳を買う",
      dueDate: undefined,
      status: "todo",
      priority: "high",
      estimateMinutes: 15,
    },
  });
});

test("title が空ならエラーを返す", () => {
  const result = parseTask({
    id: 1,
    title: "",
    status: "todo",
    priority: "high",
    estimateMinutes: 15,
  });
  assert.deepEqual(result, { ok: false, error: "title が空です" });
});

test("status が決まった値でなければエラーを返す", () => {
  const result = parseTask({
    id: 1,
    title: "牛乳を買う",
    status: "later",
    priority: "high",
    estimateMinutes: 15,
  });
  assert.deepEqual(result, { ok: false, error: "status が違います（later）" });
});
