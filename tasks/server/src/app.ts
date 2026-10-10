import { Hono } from "hono";
import { isTaskStatus, parseTask } from "@tasks/shared";
import { sortByDueDate } from "./task-list.ts";
import {
  addTask,
  deleteTask,
  getTask,
  listTasks,
  updateTask,
} from "./task-store.ts";

export const app = new Hono();

app.get("/api/tasks", async (c) => {
  const status = c.req.query("status");
  const list = await listTasks(isTaskStatus(status) ? status : undefined);
  return c.json(sortByDueDate(list));
});

app.get("/api/tasks/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const task = await getTask(id);
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
  const parsed = parseTask({ ...body, id: 0 });
  if (!parsed.ok) {
    return c.json({ error: parsed.error }, 400);
  }
  const task = await addTask(parsed.task);
  return c.json(task, 201);
});

app.patch("/api/tasks/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const current = await getTask(id);
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
  const task = await updateTask(parsed.task);
  return c.json(task);
});

app.delete("/api/tasks/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (!(await deleteTask(id))) {
    return c.json({ error: `id ${id} のタスクはありません` }, 404);
  }
  return c.body(null, 204);
});

async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
}
