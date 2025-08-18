import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_WHATSAPP_DB_URL!,
    authToken: process.env.TURSO_WHATSAPP_DB_TOKEN!,
  },
});
