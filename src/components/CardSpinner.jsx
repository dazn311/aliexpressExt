'use client'

import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import { useInView } from "react-intersection-observer";
import {getNextItems} from '@/app/actions';

export default function CardSpinner(props)  {
    const {setProducts,category} = props;
    const [isShowImg, setIsShowImg] = useState(true);
    const initCategory = useRef({[category]:1});

    const [ref, inView] = useInView({
        /* Optional options */
        threshold: 0,
    });

    useEffect(()=>{
        if (!inView) return;
        const nextPage =  (initCategory.current[category] ?? 1) + 1;
        if (initCategory.current[category] === nextPage) return;//already loaded this page;

        initCategory.current = {...initCategory.current,[category]:nextPage};
        getNextItems({category,page:String(nextPage)})
            .then(res => {
                if (!Array.isArray(res) && res.status === 500) {
                    setIsShowImg(false);
                    return;
                }

                setProducts(prev => ([
                    ...(!!prev && inView && nextPage > 1 ? prev : []),
                    ...res
                ]));
            })
            .catch(err => console.log(err));
        // return ()=>{
        //     console.log('[42 CardSpinner useEffect] 🔸unMount :');
        // }
    },[inView,category]);

    if (!isShowImg) {
        return null;
    }

    return <div ref={ref} className='group cursor-pointer sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200'>
            <Image
                src={'/spinner.svg'}
                width={50}
                height={50}
                className='sm:rounded-t-lg group-hover:opacity-75 transition-opacity duration-300'
                alt='loading...'
            />
            <div className='p-2'>
                <p className='flex items-center'>
                    ...loading products {JSON.stringify(category)}
                </p>
            </div>
    </div>
}
// const [page, setPage] = useState(1);
// const hasNextPageRef = useRef(true);//[category]:true,
// const pageRef = useRef(1);//[category]:true,

// console.log('[9 CardSpinner] category:',category);
// console.log('[9 CardSpinner] isPageRef:',hasNextPageRef.current);

// console.log('[14 CardSpinner] category :', category);
// console.log('[15 CardSpinner] initCategory :', JSON.stringify(initCategory.current));

// const CardSpinner = React.forwardRef((props,ref) => {
// CardSpinner.displayName = 'CardSpinner';
// export default CardSpinner;

// useEffect(()=>{
//     pageRef.current = 1;
//     initCategory.current = {...initCategory.current,[category]:1};
//     console.log('[26 CardSpinner] 🔸initCategory :', JSON.stringify(initCategory.current));
//     getNextItems({category,page:'1'})
//         .then(res => {
//
//             initCategory.current = {...initCategory.current,[category]:1};
//             pageRef.current = 1;
//             setProducts(res);
//         })
//         .catch(err => console.log(err));
//     return ()=>{
//         pageRef.current = 1;
//     }
// },[category,pageRef,initCategory]);