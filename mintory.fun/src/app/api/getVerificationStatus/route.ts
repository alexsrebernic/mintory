import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {
    const {address} = await request.json()

    try {
        if(address)
        return NextResponse.json({verified: true, success: true})
    else return NextResponse.json({ verified: false, success: false });
    } catch (error : any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
    
}