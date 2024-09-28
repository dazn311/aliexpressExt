'use client';

import { useState,useEffect,useCallback } from 'react';
import { useRouter,useParams,useSearchParams } from 'next/navigation';
import _has from 'lodash/has';
import _get from 'lodash/get';

export default function SearchBox() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (params.searchTerm === undefined) {
      setSearch('');
    }
  },[params.searchTerm]);

  const createQueryString = useCallback(
      (name= 'string', value= 'string') => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)

        return params.toString()
      },
      [searchParams]
  )
  const handleSubmit = (e) => {
    e.preventDefault();
    const category = searchParams.get("category")
    const urlSearch = createQueryString('category',category);
    router.push(`/search/${search}?${urlSearch}`);
  };

  const handleInput = (event) => {
    event.preventDefault();
    let val = _get(event,['target','value']);
    if (val === undefined && _has(event,['touches',0,'target','value'])) {
      val = _get(event,['touches',0,'target','value']);
    }
    setSearch(val);
  };

  return (
      <form
          className='flex justify-between px-5 max-w-6xl mx-auto'
          onSubmit={handleSubmit}
      >
        <input
            type='text'
            placeholder='Search keywords...'
            className='w-full h-14 rounded-md placeholder-gray-500 outline-none bg-transparent flex-1'
            value={search}
            onChange={handleInput}
        />
        <button
            className='text-amber-600 disabled:text-gray-400'
            disabled={search === ''}
        >
          Search
        </button>
      </form>
  );
}
