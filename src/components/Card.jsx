import Image from 'next/image';
import Link from 'next/link';
import { FiThumbsUp } from 'react-icons/fi';
import _get from 'lodash/get';

export default function Card({ result }) {
  const imageSrc = _get(result,['images',0,'imgUrl']);
  return (
    <div className='group cursor-pointer sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200'>
      <Link href={`/prd/${result.productId}`}>
        <Image
          src={imageSrc ? `https:${imageSrc}` : '/Rectangle500x300.svg'}
          width={500}
          height={300}
          className='sm:rounded-t-lg group-hover:opacity-75 transition-opacity duration-300'
          alt='card'
        />
        <div className='p-2'>
          <p className='line-clamp-2 text-md'>seller: {_get(result,['store','storeName'], '')}</p>
          <h2 title={_get(result,['title','displayTitle'], '')} className='text-lg font-bold truncate'>
            {_get(result,['title','displayTitle'], '')}
          </h2>
          <p className='flex items-center'>
            {_get(result,['prices','originalPrice','formattedPrice'], '')}
            <FiThumbsUp className='h-5 mr-1 ml-3' />
          </p>
        </div>
      </Link>
    </div>
  );
}