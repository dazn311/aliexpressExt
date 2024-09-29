import Results from '@/components/Results';

const DEFAULT_PAGE = process.env.DEFAULT_PAGE;

export default async function Home({ searchParams }) {
  const category = searchParams.category || DEFAULT_PAGE;

  return (<Results results={[]} category={category} isSearchable={false} />);
}
