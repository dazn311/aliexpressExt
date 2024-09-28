import Results from '@/components/Results';
import {searchItems} from '@/api/searchItems';
import NoFinePage from "@/components/NoFinePage";

const DEFAULT_PAGE = process.env.DEFAULT_PAGE;

export default async function Home({ searchParams }) {
  const category = searchParams.category || DEFAULT_PAGE;
  const results = await searchItems({category,page:'1'});

  if (!results) {
    return (<NoFinePage />);
  }

  return (<Results results={results} category={category} />);
}

