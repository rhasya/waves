import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  password: varchar("password", { length: 200 }).notNull(),
});

export const waves = pgTable("waves", {
  id: serial("id").primaryKey(),
  contents: varchar("contents", { length: 512 }).notNull(),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
});

export const likes = pgTable("likes", {
  userId: integer("user_id")
    .references(() => users.id)
    .primaryKey(),
  waveId: integer("wave_id")
    .references(() => waves.id)
    .primaryKey(),
});
