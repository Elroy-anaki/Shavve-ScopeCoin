import {config} from "dotenv"

config();

interface IEnvVars {
    DATABASE_URL: string
}

export const envVars: IEnvVars = {
    DATABASE_URL:process.env.DATABASE_URL || ""
}

