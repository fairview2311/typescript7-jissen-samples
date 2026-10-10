import { serve } from "@hono/node-server";
import { app } from "./app.ts";
import { sampleTasks } from "./sample-tasks.ts";
import { seedIfEmpty } from "./task-store.ts";

await seedIfEmpty(sampleTasks);

const port = 8787;

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`API を起動しました: http://localhost:${info.port}/api/tasks`);
});
