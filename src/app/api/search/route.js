import { NextResponse } from 'next/server'
import {data} from '@/store/aliexpress-v2/searchSneakers.js';
import data2 from '@/store/aliexpress-v2/searchTShirts.js';

export async function GET (request){
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category');
    const res = category === 'Sneakers' ? data: data2;
    return NextResponse.json(res);
}