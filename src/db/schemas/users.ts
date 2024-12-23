import * as s from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const usersTable = s.sqliteTable(
  "users",
  {
    id: s.text("cuid").primaryKey(),
    firstname: s.text({ length: 255 }).notNull(),
    lastname: s.text({ length: 255 }).notNull(),
    password: s.text({ length: 255 }).notNull(),
    email: s.text({ length: 255 }).notNull().unique(),
  },
  (t) => [s.uniqueIndex("emailUniqueIndex").on(sql`lower(${t.email})`)]
);
