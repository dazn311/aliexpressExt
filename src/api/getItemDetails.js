import _get from 'lodash/get';

const API_KEY = process.env.X_RapidAPI_Key;
const API_HOST = process.env.X_rapidapi_host;

export const getItemDetails = async (itemId) => {
    const res = await fetch(`https://aliexpress-datahub.p.rapidapi.com/item_detail_5?itemId=${itemId}&currency=RUB`,{
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
        }
      }
    );

  const {result} = await res.json();
  const imgUrl = `https:${_get(result,['item','images',0],'//')}`;
  return {
    result,imgUrl
  }
}