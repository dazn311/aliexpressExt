'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function NavbarItem({ title, param }) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  return (
    <div>
      <Link
        className={`hover:text-amber-600 font-semibold ${
            category === param
            ? 'underline underline-offset-8 decoration-4 decoration-amber-500 rounded-lg'
            : ''
        }`}
        href={`/?category=${param}`}
      >
        {title}
      </Link>
    </div>
  );
}
