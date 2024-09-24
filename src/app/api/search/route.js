import { NextResponse } from 'next/server'
import {productsDataObj} from "@/store/aliexpress-v2/productsData";

export const revalidate = true

export async function GET (request){
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category');

    return NextResponse.json(productsDataObj[category] ?? productsDataObj['Sneakers']);
}