import { NextResponse } from "next/server"

async function gethandler() {
    try {
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            error: error
        })
    }
}


export { gethandler as GET }