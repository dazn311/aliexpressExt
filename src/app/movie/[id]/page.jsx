import Image from 'next/image';
import _get from 'lodash/get';

const API_KEY = process.env.X_RapidAPI_Key;
const API_HOST = process.env.X_rapidapi_host;

export default async function MoviePage({ params }) {
  const itemId = params.id;
  const res = await fetch(
    `https://aliexpress-datahub.p.rapidapi.com/item_detail_5?itemId=${itemId}&currency=RUB`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
      }
    }
  );

  const {result} = await res.json();
  const imgUrl = `https:${_get(result,['item','images',0],'//')}`;

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
