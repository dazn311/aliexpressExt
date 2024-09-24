import Image from 'next/image';
import _get from 'lodash/get';
import {getItemDetails} from '@/api/getItemDetails';

export async function generateMetadata({ params,searchParams }) {
  // fetch data
  const result = await getItemDetails(params.id,searchParams.category);
  if (!result) {
    return 'no data';
  }
  const name = _get(result,['title','seoTitle'],'name');
  const price = _get(result,['prices','originalPrice','minPrice'],0);
  const title = name.slice(0,23)+'--' + '$' + price.toFixed(1);

  return {
    title: title,
    description:name,
  }
}

export default async function ProductPage({ params,searchParams }) {
  const result = await getItemDetails(params.id,searchParams.category);

  if (!result) {
    return <div className='w-full'>
            <div className='p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
              no data
            </div>
          </div>;
  }
  const imageSrc = _get(result,['images',0,'imgUrl']) ?? _get(result,['image','imgUrl']);
  return (
    <div className='w-full'>
      <div className='p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
        <Image
          src={imageSrc ? `https:${imageSrc}` : '/Rectangle500x300.svg'}
          width={500}
          height={300}
          className='rounded-lg'
          style={{ maxWidth: '100%', height: '100%' }}
          alt='card'
        />
        <div className='p-2'>
          <p className='font-semibold mr-1 text-gray-500'>
            {_get(result,['store','storeName'],'0')}.
          </p>
          <h2 className='text-lg mb-3 font-bold'>
            {_get(result,['title','displayTitle'],'name')}
          </h2>
          <p className='text-md mb-3'>
            <span className='text-gray-500 text-md mr-1'>sku:</span>
            {_get(result, ['trace', 'utLogMap', 'sku_id'], '0')}</p>
          <p className='mb-3'>
            <span className='text-gray-500 text-md mr-1'>lunchTime:</span>
            {(new Date(_get(result,['lunchTime'],'2000-01-01 00:00:00'))).toLocaleDateString()}
          </p>
          <p className='flex items-center text-md'>
            <span className='text-gray-500 text-md mr-1'>price:</span>
            {_get(result, ['prices', 'originalPrice', 'formattedPrice'], '0')}
          </p>
          <p className='flex items-center text-md'>
            {/*в наличии: {_get(result,['item','sku','def','quantity'],'0')} шт.*/}
          </p>
        </div>
      </div>
    </div>
  );
}
