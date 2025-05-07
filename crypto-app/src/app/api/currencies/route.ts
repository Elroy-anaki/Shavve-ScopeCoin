// app/api/currencies/route.ts
import { NextResponse } from 'next/server';
import { envVars } from '@/config/envVars/envVars.config';
import axios from 'axios';


// This API (below) is not only accessible from the server, but I wanted to keep ONE way and ONE architecture ( Go To => app/api/crypto/route for understanding why)

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
