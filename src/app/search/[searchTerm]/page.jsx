import Results from '@/components/Results';
import {searchItems} from '@/api/searchItems';

export default async function SearchPage({ params }) {
  const {result} = await searchItems(params.searchTerm);

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
      {results &&
        results.length ===
        <h1 className='text-center pt-6'>No results found</h1>}
      {results && <Results results={results} />}
    </div>
  );
}

