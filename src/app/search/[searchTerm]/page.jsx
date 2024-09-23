import Results from '@/components/Results';
import {searchItems} from '@/api/searchItems';

export default async function SearchPage({ params }) {
  const results = await searchItems(params.searchTerm,1);

  if (!results) {
    return (
      <div>
        По этому запросу не найден результат.
      </div>
    );
  }

  return (
    <div>
      {results &&
        results.length ===
        <h1 className='text-center pt-6'>No results found</h1>}
      {results && <Results results={results} />}
    </div>
  );
}

