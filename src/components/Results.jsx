'use client'
import React,{useEffect, useState} from 'react';
import { useInView } from "react-intersection-observer";
import Card from './Card';
import CardSpinner from './CardSpinner';
import {getNextItems} from '@/app/actions';

export default function Results({ results,category }) {
  const [products, setProducts] = useState(results);
  const [page, setPage] = useState(1);

  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(()=>{
    async function getMorePrd() {
      const nextPage = page + 1;
      const results = await getNextItems(category,nextPage);
      if (results.length > 0) {
        setPage(nextPage);
        setProducts(prev => ([
          ...(prev ? prev : []),
          ...results
        ]));
      }
    }

    if (inView) {
      getMorePrd().then(r => console.log(r));
    }
  },[inView]);

  return (
    <div className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-6xl mx-auto py-4'>
      {(products ?? []).map((item) => (
        <Card key={item.productId} result={item} />
      ))}
      <CardSpinner ref={ref} key={'nextPage'} inView={inView} />
    </div>
  );
}
