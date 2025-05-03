import {config} from "dotenv"

config();

interface IEnvVars {
    DB_HOST:string
DB_PORT: number
DB_USER:string
DB_PASSWORD:string
DB_NAME:string
DB_SSL:boolean
DB_URL: string,
HASH_SALT: number
}

export const envVars: IEnvVars = {
    DB_HOST: process.env.DB_HOST || "",
    DB_PORT: Number(process.env.DB_PORT)  || 5,
    DB_USER: process.env.DB_USER || "",
    DB_PASSWORD: process.env.DB_PASSWORD || "",
    DB_NAME: process.env.DB_NAME || "",
    DB_SSL: Boolean(process.env.DB_SSL) || true,
    DB_URL : process.env.DB_URL || "",
    HASH_SALT: Number(process.env.HASH_SALT) || 10

}

