import { NextResponse } from 'next/server'
import {productsDataObj} from "@/store/aliexpress-v2/productsData";

export const revalidate = true

//***/api/productBy
export async function GET (request, { params }){
    const id = params.id;
    return new Response(
        JSON.stringify({
                    response: Object.keys(productsDataObj).reduce((acc, key) => {
                        const idx = productsDataObj[key].findIndex(item => item.productId === id);
                        if (idx > -1){
                            acc = productsDataObj[key][idx];
                        }
                        return acc;
                    }, {})
                    }),
        {
            headers: {'Content-Type': 'application/json'},
            status: 200
        });
}