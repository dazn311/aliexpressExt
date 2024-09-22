import Image from 'next/image';
import _get from 'lodash/get';
import {getItemDetails} from '@/api/getItemDetails';

export async function generateMetadata({ params }, parent) {
  // read route params
  // const id = params.id
 
  // fetch data
  const {result} = await getItemDetails(params.id);
  const name = _get(result,['item','title'],'name');
  const price = _get(result,['item','sku','def','price'],'0');
  const priceInt = parseInt(price);
  const title = name.slice(0,23)+'--' + (priceInt/1000).toFixed() + 'тр.';

  return {
    title: title
  }
}

export default async function MoviePage({ params }) {
  const {result,imgUrl} = await getItemDetails(params.id);

  return (
    <div className='w-full'>
      <div className='p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
        <Image
          src={imgUrl}
          width={500}
          height={300}
          className='rounded-lg'
          style={{ maxWidth: '100%', height: '100%' }}
        />
        <div className='p-2'>
          <p className='font-semibold mr-1 text-gray-500'>
          Продавец: {_get(result,['seller','storeTitle'],'0')}.
          </p>
          <h2 className='text-lg mb-3 font-bold'>
            {_get(result,['item','title'],'name')}
          </h2>
          <p className='text-lg mb-3'>wishCount: {_get(result,['item','wishCount'],'0')}</p>
          <p className='mb-3'>
            <span className='font-semibold mr-1'>sales:</span>
            {_get(result,['item','sales'],'0')}
          </p>
          <p className='mb-3'>
            <span className='font-semibold mr-1'>Rating:</span>
            {_get(result,['item','sales'],'sales')}
          </p>
          <p className='flex items-center'>
          {_get(result,['item','sku','def','price'],'0')}р.
          </p>
          <p className='flex items-center'>
          в наличии: {_get(result,['item','sku','def','quantity'],'0')} шт.
          </p>
        </div>
      </div>
    </div>
  );
}
