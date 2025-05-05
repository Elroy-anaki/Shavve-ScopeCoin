import { config } from "dotenv"

config();

interface IEnvVars {
    DB_HOST: string
    DB_PORT: number
    DB_USER: string
    DB_PASSWORD: string
    DB_NAME: string
    DB_SSL: boolean
    DB_URL: string,
    HASH_SALT: number
    BASE_URL: string,
    ALPHA_VANTAGE_BASE_URL: string,
    ALPHA_VANTAGE_API_KEY: string,

    OPEN_EXCHANGE_RATES_BASE_URL: string,
    OPEN_EXCHANGE_RATES_API_KEY: string,
    EXCHANGE_RATE_BASE_URL: string
    EXCHANGE_RATE_API_KEY: string,
    COIN_MARKET_BASE_URL: string,
    COIN_MARKET_API_KEY: string

}

export const envVars: IEnvVars = {
    DB_HOST: process.env.DB_HOST || "",
    DB_PORT: Number(process.env.DB_PORT) || 5,
    DB_USER: process.env.DB_USER || "",
    DB_PASSWORD: process.env.DB_PASSWORD || "",
    DB_NAME: process.env.DB_NAME || "",
    DB_SSL: Boolean(process.env.DB_SSL) || true,
    DB_URL: process.env.DB_URL || "",
    HASH_SALT: Number(process.env.HASH_SALT) || 10,
    BASE_URL: process.env.BASE_URL || "",
    OPEN_EXCHANGE_RATES_BASE_URL: process.env.OPEN_EXCHANGE_RATES_BASE_URL || "",
    OPEN_EXCHANGE_RATES_API_KEY: process.env.OPEN_EXCHANGE_RATES_API_KEY || "",
    EXCHANGE_RATE_API_KEY: process.env.EXCHANGE_RATE_API_KEY || "",
    EXCHANGE_RATE_BASE_URL: process.env.EXCHANGE_RATE_BASE_URL || "",
    ALPHA_VANTAGE_BASE_URL: process.env.ALPHA_VANTAGE_BASE_URL || "",
    ALPHA_VANTAGE_API_KEY: process.env.ALPHA_VANTAGE_API_KEY || "",
    COIN_MARKET_BASE_URL: process.env.NEXT_PUBLIC_COIN_MARKET_BASE_URL || "",
    COIN_MARKET_API_KEY: process.env.NEXT_PUBLIC_COIN_MARKET_API_KEY || ""
    
}

