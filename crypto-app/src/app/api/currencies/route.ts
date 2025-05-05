// app/api/currencies/route.ts
import { NextResponse } from 'next/server';
import { envVars } from '@/config/envVars/envVars.config';
import axios from 'axios';

export async function GET() {
  try {
    const {data} = await axios.get(`${envVars.OPEN_EXCHANGE_RATES_BASE_URL}/currencies.json`)
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching currencies:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to fetch currencies' },
      { status: 500 }
    );
  }
}
