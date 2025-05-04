import { NextRequest, NextResponse } from 'next/server';
import {signUp} from "@/db/api/auth/requests"


export async function POST(request: NextRequest) {
    try {
        console.log("POST")
        const body = await request.json(); 
          const newUser = await signUp(body)
          console.log("newUser", newUser)
          return NextResponse.json(body)
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message || 'Internal Server Error' },
            { status: 404 }
          );
    }
    
    
    }