import { NextResponse } from 'next/server'
import {data} from '@/store/aliexpress-v2/searchSneakers.js';
import data2 from '@/store/aliexpress-v2/searchTShirts';
import _get from 'lodash/get';

export const revalidate = true
// /api/productBy
export async function GET (request, { params }){
    const slug = params.id;
    const contentsArr = _get(data,['content']) ?? [];
    const idx = contentsArr.findIndex(item => item.productId === slug);
    if (idx > -1){
        return NextResponse.json({response:contentsArr[idx]});
    } else {
        const contentsArr2 = _get(data2,['content']) ?? [];
        const idx2 = contentsArr2.findIndex(item => item.productId === slug);
        if (idx2 > -1){
            return NextResponse.json({response:contentsArr2[idx2]});
        }
    }
    return NextResponse.json({response:null});
}