import Results from '@/components/Results';

const API_KEY = process.env.X_RapidAPI_Key;
const API_HOST = process.env.X_rapidapi_host;

export default async function Home({ searchParams }) {
  const genre = searchParams.genre || 'iphone';
  const res = await fetch(`https://aliexpress-datahub.p.rapidapi.com/item_search_5?q=${genre}&page=1&sort=default&currency=RUB`, 
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
      }
    }
  );

  const {result} = await res.json();

  if (result.status.data !== 'success') {
    return (
      <div>
        По этому запросу не найден результат.
      </div>
    );
  }
  const results = result['resultList'];

  return (
    <div>
      <Results results={results} />
    </div>
  );
}

