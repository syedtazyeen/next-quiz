import { NextResponse } from "next/server"

async function gethandler() {
    try {
        return NextResponse.json({
            status: 200,
            message: "API is working"
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            error: error
        })
    }
}


export { gethandler as GET }