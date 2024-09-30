'use client'
import React,{useState,useEffect} from 'react';
import Card from './Card';
import CardSpinner from './CardSpinner';
import {getNextItems} from "@/app/actions";
import Image from "next/image";

export default function Results(
  {
    results=[],
    category,
    isSearchable=true
  }) {
  const [products, setProducts] = useState(results);

  useEffect(()=>{
    if (results.length > 0) {
      return;
    }
    let isMounted = true;
    getNextItems({category,page:'1'})
        .then(res => {
            if (isMounted) {
              setProducts(res);
            }
        })
        .catch(err => console.log(err));
    return () => {
        isMounted = false;
    }
  },[category]);

  if (products.length === 0) {
    return (
        <div className='grid-cols-1 max-w-6xl mx-auto py-4'>
           <div className="images">
               <Image
                   src={'/spinner.svg'}
                   width={250}
                   height={250}
                   className='sm:rounded-t-lg mx-auto group-hover:opacity-75 transition-opacity duration-300'
                   alt='loading...'
               />
           </div>
        </div>
    );
  }

    return (<>
            <div
                className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-6xl mx-auto py-4'>
                {products.length > 0 && products.map((item, idx) => (
                    <Card key={item.productId + category + idx} category={category} result={item}/>
                ))}
            </div>
            {!isSearchable && products.length > 0 &&
                <CardSpinner
                    key={'nextPage'}
                    setProducts={setProducts}
                    category={category}
                />}
        </>);
}
