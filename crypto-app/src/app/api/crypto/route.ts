import { NextResponse } from 'next/server';
import { envVars } from '@/config/envVars/envVars.config';
import axios from 'axios';


// This API (below) is only accessible from the server, so as soon as the app is initialized, a request is sent here to update the cryptos
export async function GET() {
  try {
    const url = `${envVars.COIN_MARKET_BASE_URL}/v1/cryptocurrency/map?limit=50&CMC_PRO_API_KEY=${envVars.COIN_MARKET_API_KEY}`;
    console.log("envVars.COIN_MARKET_API_KEY", envVars.COIN_MARKET_API_KEY)
    console.log(url)
    const { data } = await axios.get(url)
    console.log(data)

    return NextResponse.json(data.data);
  } catch (error: any) {
    console.error('Error fetching crypto data:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to fetch crypto data' },
      { status: 500 }
    );
  }
}
