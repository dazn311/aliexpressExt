const BASE_URL = process.env.BASE_URL;

export const getItemDetails = async (itemId) => {
  const res = await fetch(`${BASE_URL}/api/productBy/${itemId}`,{
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
    next: { revalidate: 1 }
  });

  if (res.status === 200) {
    const {response} = await res.json();
    return response;
  }
  return null;
}
