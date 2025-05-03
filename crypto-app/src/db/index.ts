import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";
import { envVars } from "@/config/envVars/envVars.config";


const connectionString = envVars.DB_URL;
const client = postgres(connectionString);

export const db = drizzle(client, { schema });