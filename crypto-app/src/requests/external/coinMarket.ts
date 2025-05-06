import { envVars } from "@/config/envVars/envVars.config"
import axios from "axios"


export const convertCrypto = async(base: string, target: string, amount: number) => {
    try {
        console.log(base)
        console.log(isNaN(Number(base)))
        const url = `${envVars.COIN_MARKET_BASE_URL}/v1/tools/price-conversion?CMC_PRO_API_KEY=${envVars.COIN_MARKET_API_KEY}&amount=${amount}&${isNaN(Number(base))? "symbol": "id"}=${base}&convert=${target}`
        console.log(url)
        const {data} = await axios.get(url)
        console.log(data)
        return data.data
    } catch (error) {
        throw error
    }

}