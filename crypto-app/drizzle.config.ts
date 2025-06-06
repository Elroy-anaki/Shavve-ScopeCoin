import { defineConfig } from "drizzle-kit";
import { envVars } from "@/config/envVars/envVars.config";


export default defineConfig({
  schema: "./src/config/db/schema/*",
  out: "./src/config/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    user: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_NAME,
  },
});