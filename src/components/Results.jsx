'use client'
import React,{useEffect, useState, useRef} from 'react';
import { useInView } from "react-intersection-observer";
import Card from './Card';
import CardSpinner from './CardSpinner';
// import {getNextItems} from '@/app/actions';
// import NoFinePage from './NoFinePage';

export default function Results({ results,category }) {
  const [products, setProducts] = useState(results);
  const [page, setPage] = useState(1);
  const [isPage, setIsPage] = useState(()=>({[category]:true}));//{TShirts:true}
  const initCategory = useRef(category);
  const lastView = useRef('');
  const isPageRef = useRef({TShirts:true,Shorts:true,Sneakers:true});//[category]:true,

  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0,
  });


  useEffect(()=>{
    if (inView || initCategory.current !== category) {//|| initCategory.current !== category
      if (inView) {
        if (category === 'all' || lastView.current === `${category}:${page}`) {
          return;
        }
        lastView.current = `category${page +1}`;
      }
    }
  },[inView,category,page]);
  // console.log('[45 Results]:',JSON.stringify(isPageRef,null,2));
  return (
      <div className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-6xl mx-auto py-4'>
        {products.length > 0 && products.map((item,idx) => (
            <Card key={item.productId + category + idx} category={category} result={item} />
        ))}
        {isPageRef.current[category] &&
            <CardSpinner
                ref={ref}
                key={'nextPage'}
                inView={inView}
                isPageRef={isPageRef}
                setProducts={setProducts}
                setPage={setPage}
                setIsPage={setIsPage}
                initCategory={initCategory}
                category={category}
                page={page}
                isPage={isPageRef.current[category]}
            /> }
        <div>{JSON.stringify(isPageRef.current,null,2)}</div>
      </div>
  );
}

// useEffect(()=>{
//   if (inView || initCategory.current !== category) {//|| initCategory.current !== category
//     if (inView) {
//       if (category === 'all' || lastView.current === `${category}:${page}`) {
//         return;
//       }
//       lastView.current = `category${page +1}`;
//     }
//     const nextPage =  inView ? page + 1 : 1;
//     initCategory.current = `${category}:${nextPage}`;
//     getNextItems({category,page:String(nextPage)})
//         .then(res => {
//           if (!res || !res.length) {
//             isPageRef.current = {...isPageRef.current,[category]:false};
//             // setIsPage(prev => ({...prev,[category]:false}));
//             return;
//           }
//           page !== nextPage && setPage(nextPage);
//           setProducts(prev => ([
//             ...(!!prev && inView && nextPage > 1 ? prev : []),
//             ...res
//           ]));
//         });
//   }
// },[inView,category,page]);