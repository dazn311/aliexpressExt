import { NextResponse } from 'next/server'
import {productsDataObj} from "@/store/aliexpress-v2/productsData";
import productsOfPage from "@/utils/productsOfPage";

export const revalidate = true

/**
 * 240925 /api/search/
 * https://nextjs.org/docs/app/building-your-application/routing/route-handlers
 * @param {Object} request - The request to load.
 * @returns {Array} The productsDataArr.
 */
export async function GET (request){
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');//woman,searchTerm
    const searchTerm = searchParams.get('searchTerm');//1
    const page = searchParams.get('page');//1

    if (!!searchTerm) {
        const catalogName = !!category && productsDataObj[category] ? category : 'all';
        return NextResponse.json(findProducts(productsDataObj,searchTerm,catalogName), { status: 200 });
    }

    if (!!category && productsDataObj[category]) {
        const products = productsOfPage(productsDataObj[category],page);
        return NextResponse.json(products, { status: 200 });
    } else {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

}

function findProducts(productsDataObj={},searchTerm='',catalogName='all | Sneakers') {
    const regexKey = new RegExp(searchTerm, "i");
    return Object.keys(productsDataObj).reduce((accArr,prdKey) => {
        const products2Arr = productsDataObj[prdKey];
        const productsArr = products2Arr.filter(item => regexKey.test(item.title?.displayTitle));
        if (productsArr.length > 0) {
            accArr.push(...productsArr);
        }
        return accArr;
    },[]);
}