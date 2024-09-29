import Results from '@/components/Results';
import {searchItems} from '@/api/searchItems';
import NoFinePage from '@/components/NoFinePage';

const DEFAULT_PAGE = process.env.DEFAULT_PAGE;

export default async function SearchPage({ params,searchParams }) {
  const category = searchParams.category || DEFAULT_PAGE;
  const results = await searchItems({category,searchTerm:params.searchTerm,page:'1'});

  if (!results || results.length === 0) {
    return (
        <NoFinePage/>
    );
  }

  return (<Results results={results} category={category} isSearchable={true} />);
}
