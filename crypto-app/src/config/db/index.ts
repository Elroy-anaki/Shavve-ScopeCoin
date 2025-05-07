import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/config/db/schema";
import { envVars } from "@/config/envVars/envVars.config";

// Config drizzle with postgress
const connectionString = envVars.DB_URL;
const client = postgres(connectionString);

export const db = drizzle(client, { schema });