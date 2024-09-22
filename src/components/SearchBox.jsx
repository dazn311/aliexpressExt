'use client';

import { useState,useEffect } from 'react';
import { useRouter,useParams } from 'next/navigation';

export default function SearchBox() {
  const [search, setSearch] = useState('');
  const router = useRouter();  
  const params = useParams();

  useEffect(() => {
    if (params.searchTerm === undefined) {
      setSearch('');
    }
  },[params.searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/${search}`);
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
        onChange={(e) => setSearch(e.target.value)}
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
