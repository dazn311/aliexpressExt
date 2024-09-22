import Results from '@/components/Results';
import {searchItems} from '@/api/searchItems';

export default async function Home({ searchParams }) {
  const {result} = await searchItems(searchParams.genre || 'iphone');

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
      <Results results={results} />
    </div>
  );
}

