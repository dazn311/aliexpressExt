const BASE_URL = process.env.BASE_URL;

export const getItemDetails = async (itemId,category) => {
  const res = await fetch(`${BASE_URL}/api/productBy/${itemId}?category=${category}`,{
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
    next: { revalidate: 1 }
  });

  if (res.status === 200) {
    const data = await res.json();
    return !!data.response ? data.response : data;
  }
  return null;
}
