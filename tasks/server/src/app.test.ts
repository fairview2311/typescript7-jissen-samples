import assert from "node:assert/strict";
import { test } from "node:test";
import { parseTask } from "@tasks/shared";

// app.ts を読み込む前に、メモリーのデータベースを使うように指定する
process.env.DB_FILE = ":memory:";
const { app } = await import("./app.ts");

const sendJson = (method: string, body: unknown): RequestInit => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

test("POST で足したタスクを GET で取れる", async () => {
  const created = await app.request(
    "/api/tasks",
    sendJson("POST", {
      title: "牛乳を買う",
      status: "todo",
      priority: "high",
      estimateMinutes: 15,
    }),
  );
  assert.equal(created.status, 201);
  const parsed = parseTask(await created.json());
  assert.ok(parsed.ok);

  const found = await app.request(`/api/tasks/${parsed.task.id}`);
  assert.equal(found.status, 200);
});

test("title が空なら 400 を返す", async () => {
  const response = await app.request(
    "/api/tasks",
    sendJson("POST", { title: "", status: "todo", priority: "high", estimateMinutes: 15 }),
  );
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "title が空です" });
});

test("無い id は 404 を返す", async () => {
  const response = await app.request("/api/tasks/999");
  assert.equal(response.status, 404);
});
