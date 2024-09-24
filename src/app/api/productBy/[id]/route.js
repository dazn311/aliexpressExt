import { NextResponse } from 'next/server'

import {productsDataObj} from "@/store/aliexpress-v2/productsData";

export const revalidate = true
// /api/productBy
export async function GET (request, { params }){
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category');
    const slug = params.id;
    const productArr = productsDataObj[category] ?? productsDataObj['Sneakers'];
    const idx = productArr.findIndex(item => item.productId === slug);
    if (idx > -1){
        return NextResponse.json({response:productArr[idx]});
    }
    return NextResponse.json({response:null});
}