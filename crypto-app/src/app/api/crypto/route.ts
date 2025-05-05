// app/api/crypto/route.ts
import { NextResponse } from 'next/server';
import { envVars } from '@/config/envVars/envVars.config';
import axios from 'axios';

export async function GET() {
  try {
    const url = `${envVars.COIN_MARKET_BASE_URL}/v1/cryptocurrency/map?limit=50`;
    const { data } = await axios.get(url, {
      headers: {
        'X-CMC_PRO_API_KEY': envVars.COIN_MARKET_API_KEY,
      },
    });

    return NextResponse.json(data.data);
  } catch (error: any) {
    console.error('Error fetching crypto data:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to fetch crypto data' },
      { status: 500 }
    );
  }
}
