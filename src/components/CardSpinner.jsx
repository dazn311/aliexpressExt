import Image from 'next/image';
import Link from 'next/link';

export default function CardSpinner({ isNextPage }) {

  return (
    <div className='group cursor-pointer sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200'>
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
          ...loading
          </p>
        </div>
      </Link>
    </div>
  );
}