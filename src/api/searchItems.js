const BASE_URL = process.env.BASE_URL;

export const searchItems = async (searchTerm,page=1) => {
    const res = await fetch(`${BASE_URL}/api/search?category=${searchTerm}&page=${page}`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (res.status === 200) {
        const {content} = await res.json();
        return content;
    }
    return null;
}
