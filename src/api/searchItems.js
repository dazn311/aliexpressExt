import _get from 'lodash/get';

const API_KEY = process.env.X_RapidAPI_Key;
const API_HOST = process.env.X_rapidapi_host;

export const searchItems = async (seachTerm) => {
    const res = await fetch(`https://aliexpress-datahub.p.rapidapi.com/item_search_5?q=${seachTerm}}&page=1&sort=default&currency=RUB`,{
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
        }
      }
    );

    return await res.json();
    // const {result} = await res.json();
  // return _get(result,['resultList']);
}