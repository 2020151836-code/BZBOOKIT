import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./drizzle/schema.ts",
  dialect: "postgresql",   // <-- this is the critical part
  dbCredentials: {
    url: process.env.DATABASE_URL!,  // your Supabase db URL
  },
});
