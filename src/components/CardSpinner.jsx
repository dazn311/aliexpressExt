'use client'

import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import { useInView } from "react-intersection-observer";
import {getNextItems} from '@/app/actions';
import GlobalConstants from "@/store/globalConstants";

export default function CardSpinner(props)  {
    const {setProducts,category} = props;
    const [isShowImg, setIsShowImg] = useState({[category]:1});
    const initCategory = useRef({[category]:1});

    const [ref, inView] = useInView({
        /* Optional options */
        threshold: 0,
    });

    useEffect(()=>{
        setIsShowImg(prev=> ({...prev,[category]:true}));
    },[category]);

    useEffect(()=>{
        if (!inView) {
            // setIsShowImg(prev=> ({...prev,[category]:true}));
            return;
        }
        const nextPage =  (initCategory.current[category] ?? 1) + 1;
        if (GlobalConstants.MAX_PAGES_LENGTH < nextPage) {
            setIsShowImg(prev=> ({...prev,[category]:false}));
            return;//already loaded this page;
        }
        if (initCategory.current[category] === nextPage) return;//already loaded this page;

        initCategory.current = {...initCategory.current,[category]:nextPage};
        getNextItems({category,page:String(nextPage)})
            .then(res => {
                // console.log('[26 CardSpinner] 🔸res :', JSON.stringify(res));
                if (Array.isArray(res) && res.length === 0) {
                    setIsShowImg(prev=> ({...prev,[category]:false}));
                    return;
                }

                setProducts(prev => ([
                    ...(!!prev && inView && nextPage > 1 ? prev : []),
                    ...res
                ]));
            })
            .catch(err => console.log(err));
    },[inView,category]);

    return <div ref={ref} className='grid grid-cols-1 w-full'>
        {isShowImg[category] &&
            <Image
                src={'/spinner.svg'}
                width={200}
                height={200}
                className='sm:rounded-t-lg group-hover:opacity-75 transition-opacity duration-300 mx-auto'
                alt='loading...'
            />}
        {JSON.stringify(isShowImg, null, 2)}
        <div>{category}</div>
    </div>
}
