import { drizzle } from "drizzle-orm/node-sqlite";

export const db = drizzle("tasks.db");
