import { envVars } from "@/config/envVars/envVars.config"
import axios from "axios"



export async function getAllSymbols() {
    try {
        const {data} = await axios.get(`${envVars.OPEN_EXCHANGE_RATES_BASE_URL}/currencies.json`)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
    
}

export async function getAllCurrencies() {
    try {
        const {data} = await axios.get(`${envVars.OPEN_EXCHANGE_RATES_BASE_URL}/latest.json?app_id=${envVars.OPEN_EXCHANGE_RATES_API_KEY}`)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
    
}

export const convertAmount = async(base:string, target: string, amount: number) => {
    try {
        const url = `${envVars.EXCHANGE_RATE_BASE_URL}${envVars.EXCHANGE_RATE_API_KEY}/pair/${base}/${target}/${amount}`
        const {data} = await axios.get(url)
        const res = {conversion_rate: data.conversion_rate, conversion_result: data.conversion_result}
        return res
    } catch (error) {
        throw error
    }
}