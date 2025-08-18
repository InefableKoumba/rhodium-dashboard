import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";

config({ path: ".env" }); // or .env.local

export const db = drizzle({
  connection: {
    url: process.env.TURSO_WHATSAPP_DB_URL!,
    authToken: process.env.TURSO_WHATSAPP_DB_TOKEN!,
  },
});
