import { NextRequest, NextResponse } from 'next/server';
import {createUser} from "@/db/api/users/requests"


export async function POST(request: NextRequest) {
    try {
        console.log("POST")
        const body = await request.json(); 
          const newUser = await createUser(body)
          console.log("newUser", newUser)
          return NextResponse.json(body)
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message || 'Internal Server Error' },
            { status: 404 }
          );
    }
    
    
    }