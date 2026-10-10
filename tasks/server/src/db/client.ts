import { join } from "node:path";
import { drizzle } from "drizzle-orm/node-sqlite";
import { migrate } from "drizzle-orm/node-sqlite/migrator";

// DB_FILE が無ければ tasks.db を使う。テストでは ":memory:" を渡す
const file = process.env.DB_FILE ?? "tasks.db";

export const db = drizzle(file);

// メモリーのデータベースは毎回空なので、表を作ってから使う
if (file === ":memory:") {
  migrate(db, { migrationsFolder: join(import.meta.dirname, "../../drizzle") });
}
