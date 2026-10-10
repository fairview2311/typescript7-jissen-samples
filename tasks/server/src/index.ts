import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { isTaskStatus, parseTask, type Task } from "@tasks/shared";
import { sampleTasks } from "./sample-tasks.ts";
import { sortByDueDate } from "./task-list.ts";

const app = new Hono();

let tasks: Task[] = [...sampleTasks];
let nextId = 6;

app.get("/api/tasks", (c) => {
  const status = c.req.query("status");
  const list = isTaskStatus(status)
    ? tasks.filter((task) => task.status === status)
    : tasks;
  return c.json(sortByDueDate(list));
});

app.get("/api/tasks/:id", (c) => {
  const id = Number(c.req.param("id"));
  const task = tasks.find((t) => t.id === id);
  if (task === undefined) {
    return c.json({ error: `id ${id} のタスクはありません` }, 404);
  }
  return c.json(task);
});

app.post("/api/tasks", async (c) => {
  const body = await readJson(c.req.raw);
  if (typeof body !== "object" || body === null) {
    return c.json({ error: "JSON のオブジェクトを送ってください" }, 400);
  }
  const parsed = parseTask({ ...body, id: nextId });
  if (!parsed.ok) {
    return c.json({ error: parsed.error }, 400);
  }
  nextId += 1;
  tasks.push(parsed.task);
  return c.json(parsed.task, 201);
});

app.patch("/api/tasks/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const current = tasks.find((t) => t.id === id);
  if (current === undefined) {
    return c.json({ error: `id ${id} のタスクはありません` }, 404);
  }
  const body = await readJson(c.req.raw);
  if (typeof body !== "object" || body === null) {
    return c.json({ error: "JSON のオブジェクトを送ってください" }, 400);
  }
  const parsed = parseTask({ ...current, ...body, id });
  if (!parsed.ok) {
    return c.json({ error: parsed.error }, 400);
  }
  tasks = tasks.map((t) => (t.id === id ? parsed.task : t));
  return c.json(parsed.task);
});

app.delete("/api/tasks/:id", (c) => {
  const id = Number(c.req.param("id"));
  if (!tasks.some((t) => t.id === id)) {
    return c.json({ error: `id ${id} のタスクはありません` }, 404);
  }
  tasks = tasks.filter((t) => t.id !== id);
  return c.body(null, 204);
});

async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
}

const port = 8787;

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`API を起動しました: http://localhost:${info.port}/api/tasks`);
});
