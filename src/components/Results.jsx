'use client'
import React,{useEffect, useState, useRef} from 'react';
import { useInView } from "react-intersection-observer";
import Card from './Card';
import CardSpinner from './CardSpinner';
import {getNextItems} from '@/app/actions';

export default function Results({ results,category }) {
  const [products, setProducts] = useState(results);
  const [page, setPage] = useState(1);
  const lastCategory = useRef(category);
  const lastView = useRef('');

  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(()=>{
    if (inView || lastCategory.current !== category) {//|| lastCategory.current !== category
      lastCategory.current = category;
      if (inView) {
        if (lastView.current === `category${page}`) {
          return;
        }
        lastView.current = `category${page +1}`;
      }
      const nextPage =  inView ? page + 1 : 1;
      getNextItems(category,nextPage)
          .then(res => {
            page !== nextPage && setPage(nextPage);
            setProducts(prev => ([
              ...(!!prev && inView && nextPage > 1 ? prev : []),
              ...res
            ]));
          });
    }
  },[inView,category,page]);

  return (
    <div className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-6xl mx-auto py-4'>
      {products.length > 0 && products.map((item,idx) => (
        <Card key={item.productId + category + idx} category={category} result={item} />
      ))}
      <CardSpinner ref={ref} key={'nextPage'} inView={inView} />
    </div>
  );
}
