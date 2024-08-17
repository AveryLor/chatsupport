import {NextResponse} from 'next/sever'
export function POST(req) {
    console.log('POST /api/chat')
    return NextResponse.json({message: 'Hello from the server'})
}

// Follow tutorial to continue