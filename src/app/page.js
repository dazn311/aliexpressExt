import Results from '@/components/Results';
import {searchItems} from '@/api/searchItems';

export default async function Home({ searchParams }) {
  const genre = searchParams.genre || 'iphone';
  const {result} = await searchItems(genre,1);

  if (result?.status?.data !== 'success') {
    return (
      <div>
        По этому запросу не найден результат.
      </div>
    );
  }

  const results = result['resultList'];

  return (
    <div>
      <Results results={results} genre={genre} />
    </div>
  );
}

