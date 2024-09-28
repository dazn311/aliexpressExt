'use client'

import React,{useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {getNextItems} from '@/app/actions';

const CardSpinner = React.forwardRef((props,ref) => {
    const {isPageRef,setProducts,setPage,setIsPage,category,page,inView,initCategory} = props;
    // console.log('[9 CardSpinner] isPageRef:',isPageRef);
    // console.log('[9 CardSpinner] category:',category);
    useEffect(()=>{
        if (inView) {
            const nextPage =  inView ? page + 1 : 1;
            initCategory.current = `${category}:${nextPage}`;
            getNextItems({category,page:String(nextPage)})
                .then(res => {
                    console.log('[16 CardSpinner] res:',res);
                    if (!res || !res.length) {
                        isPageRef.current = {...isPageRef.current,[category]:false};
                        setIsPage(prev => ({...prev,[category]:false}));
                        return;
                    }
                    page !== nextPage && setPage(nextPage);
                    setProducts(prev => ([
                        ...(!!prev && inView && nextPage > 1 ? prev : []),
                        ...res
                    ]));
                });
        }
    },[inView,category,page]);

    if (!isPageRef.current[category]) {
        return null;
    }

    return <div ref={ref} className='group cursor-pointer sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200'>
        <Link href={`#`}>
            <Image
                src={'/spinner.svg'}
                width={500}
                height={300}
                className='sm:rounded-t-lg group-hover:opacity-75 transition-opacity duration-300'
                alt='loading...'
            />
            <div className='p-2'>
                <p className='flex items-center'>
                    ...loading products {JSON.stringify(isPageRef.current[category])}
                </p>
            </div>
        </Link>
    </div>
});

CardSpinner.displayName = 'CardSpinner';

export default CardSpinner;
