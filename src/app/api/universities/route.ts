import { NextResponse } from 'next/server';

export async function GET() {
    const res = await fetch('http://universities.hipolabs.com/search?name=middle');
    const data = await res.json();

    return NextResponse.json(data);
}