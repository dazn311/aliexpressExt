'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const DEFAULT_PAGE = process.env.DEFAULT_PAGE;

export default function NavbarItem({ title, category }) {
    const searchParams = useSearchParams();
    const currCategory = searchParams.get('category') || DEFAULT_PAGE;

    return (
        <div>
            <Link
                className={`hover:text-amber-600 font-semibold ${
                    currCategory === category
                        ? 'underline underline-offset-8 decoration-4 decoration-amber-500 rounded-lg'
                        : ''
                }`}
                href={`/?category=${category}`}
            >
                {title}
            </Link>
        </div>
    );
}
