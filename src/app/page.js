import Results from '@/components/Results';
import {searchItems} from '@/api/searchItems';

export default async function Home({ searchParams }) {
  const category = searchParams.category || 'iphone';
  const results = await searchItems(category,1);

  if (!results) {
    return (
      <div>
        По этому запросу не найден результат.
      </div>
    );
  }

  return (
    <div>
      <Results results={results} category={category} />
    </div>
  );
}

