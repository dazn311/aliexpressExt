const BASE_URL = process.env.BASE_URL;

export const searchItems = async (searchTerm,page=1) => {
    const res = await fetch(`${BASE_URL}/api/search?category=${searchTerm}&page=${page}`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        next: { revalidate: 1 }
    });

    if (res.status === 200) {
        const data = await res.json();
        return data.content ? data.content : data;
    }
    return null;
}
