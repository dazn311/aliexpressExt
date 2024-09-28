const BASE_URL = process.env.BASE_URL;
/**
 * 240925 searchItems
 * @param {Object} props - The props {category='', searchTerm='', page='1'}.
 * @returns {Promise.<any[] | null>} The productsDataArr.
 */
export const searchItems = async (
    {
        category='',
        searchTerm='',
        page='1'
    }) => {
    const res = await fetch(`${BASE_URL}/api/search?category=${category}&searchTerm=${searchTerm}&page=${page}`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        next: { revalidate: 1 }
    });

    if (res.status === 200) {
        const data = await res.json();
        // console.log('[19 searchItems] data:',JSON.stringify(data,null,2).slice(0,100));
        return data?.content ?? data;
    }
    // console.log('[22 searchItems] res:',JSON.stringify(res,null,2).slice(0,40));
    return null;
}
