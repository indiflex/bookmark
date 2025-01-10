import Link from 'next/link';
import { PropsWithChildren } from 'react';

const LINKS = [
  { path: 'hookform', label: 'react-hook-form - simple' },
  { path: 'loginform', label: 'react-hook-form - login' },
];

export default function SamplesLayout({ children }: PropsWithChildren) {
  return (
    <div className='container my-3'>
      <div className='grid grid-cols-4'>
        <div className='x'>
          <h1 className='text-2xl mb-3'>Sample Codes</h1>
          <ul className='flex flex-col'>
            {LINKS.map(({ path, label }) => (
              <li key={path}>
                <Link
                  href={`/samples/${path}`}
                  className='text-blue-500 hover:underline underline-offset-4'
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='border px-3 py-2 col-span-3'>{children}</div>
      </div>
    </div>
  );
}
