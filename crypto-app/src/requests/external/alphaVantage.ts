import { envVars } from "@/config/envVars/envVars.config"
import axios from "axios"

const API_KEY = `apikey=${envVars.ALPHA_VANTAGE_API_KEY}`
const SEARCH_SYMBOL_URL = `${envVars.ALPHA_VANTAGE_BASE_URL}/query?function=SYMBOL_SEARCH&keywords=`
const TIME_SERIES_DAILY = `${envVars.ALPHA_VANTAGE_BASE_URL}/query?function=TIME_SERIES_DAILY&symbol=`


export const getSymbolByName = async (companyName: string) => {

    try {
        const url = `${SEARCH_SYMBOL_URL}${companyName}&${API_KEY}`
        const {data} = await axios.get(url)
        console.log(data)
        return data.bestMatches
    } catch (error) {
        throw error
    }
}

export const fetchStockPriceBySymbol = async (symbol: string) => {
    try {
        const url = `${TIME_SERIES_DAILY}${symbol}&${API_KEY}`
        const { data } = await axios.get(url);
        return data

    } catch (error) {
        throw error
    }
}