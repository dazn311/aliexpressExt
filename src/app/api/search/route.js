import { NextResponse } from 'next/server'
import {productsDataObj} from "@/store/aliexpress-v2/productsData";

export const revalidate = true

/**
 * 240925 search route
 * @param {Object} request - The request to load.
 * @returns {Array} The productsDataArr.
 */
export async function GET (request){
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');//woman,searchTerm
    const searchTerm = searchParams.get('searchTerm');//1
    const page = searchParams.get('page');//1
    // console.log('[11 get search]:',JSON.stringify({category,searchTerm,page},null,2));
    if (page === '1') {
        if (!!searchTerm) {
            const cat = !!category && productsDataObj[category] ? category : 'all';
            return NextResponse.json(findProducts(productsDataObj,searchTerm,cat));
        }

        if (!!category && productsDataObj[category]) {
            // if (!!searchTerm) {
            //     return NextResponse.json(findProducts(productsDataObj,searchTerm,category));
            // }
            // console.log('[19 get search] productsDataObj[category]:',JSON.stringify(productsDataObj[category],null,2).slice(0,100));
            return NextResponse.json(productsDataObj[category]);
        } else {
            // console.log('[21 get search] category:',JSON.stringify(category,null,2).slice(0,100));
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
            // return NextResponse.json(findProducts(productsDataObj,searchTerm,category));
        }
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    //NextResponse.error.json({content:null});
}

function findProducts(productsDataObj={},searchTerm='',category='all | Sneakers') {
    const regexKey = new RegExp(searchTerm, "i");
    const productsKeys = Object.keys(productsDataObj);
    const currKeys = Boolean(category) && category !== all
        ? productsKeys.filter(k => k === category)
        : productsKeys;
    return currKeys.reduce((accArr,prdKey) => {
        const prds2Arr = productsDataObj[prdKey];
        const prdsArr = prds2Arr.filter(item => regexKey.test(item.title?.displayTitle));
        if (prdsArr.length > 0) {
            accArr.push(...prdsArr);
        }
        return accArr;
    },[]);
}