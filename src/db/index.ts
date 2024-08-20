import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const pwd = encodeURI("rootp@ssw0rd$");
const client = postgres(`postgres://postgres:${pwd}@localhost:5432/postgres`);
const db = drizzle(client);

export { db };
