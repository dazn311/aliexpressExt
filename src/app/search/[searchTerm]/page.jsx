import Results from '@/components/Results';

const API_KEY = process.env.X_RapidAPI_Key;
const API_HOST = process.env.X_rapidapi_host;

export default async function SearchPage({ params }) {
  const seachTerm = params.searchTerm;
  console.log(seachTerm)
  const res = await fetch(
    `https://aliexpress-datahub.p.rapidapi.com/item_search_5?q=${seachTerm}&currency=RUB`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
      }
    }
  );
  const {result} = await res.json();
  const results = result['resultList'];
  return (
    <div>
      {results &&
        results.length ===
        <h1 className='text-center pt-6'>No results found</h1>}
      {results && <Results results={results} />}
    </div>
  );
}
