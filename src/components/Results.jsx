'use client'

import Card from './Card';
import CardSpinner from './CardSpinner';

export default function Results({ results }) {
  return (
    <div className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-6xl mx-auto py-4'>
      {results.map(({item}) => (
        <Card key={item.itemId} result={item} />
      ))}
      <CardSpinner key={'nextPage'} isNextPage={true} />
    </div>
  );
}
