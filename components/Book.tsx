'use client';

import { type Book } from '@prisma/client';
import { Label } from '@radix-ui/react-label';
import { PlusIcon, RedoIcon, SaveIcon, Settings } from 'lucide-react';
import { useEffect, useId, useReducer, useRef } from 'react';
import Mark from './Mark';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';

type Props = {
  book: Book;
};

export default function Book({ book }: Props) {
  const [isSetting, toggleSetting] = useReducer((pre) => !pre, false);
  const bookTitleRef = useRef<HTMLInputElement>(null);

  const marks = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    book: 0,
    url: 'https://nextjs.com',
    title: `MarkTitle ${i + 1}`,
    image: i % 2 === 0 ? '/next.svg' : '/vercel.svg',
    descript: '설명부분입니다!',
    isdel: false,
  }));

  useEffect(() => {
    if (isSetting) {
      bookTitleRef.current?.focus();
    }
  }, [isSetting]);

  const checkLabelId = useId();

  return (
    <div className='flex flex-col w-72 bg-gray-200 rounded-md max-h-full'>
      <div className='flex items-center justify-between px-3 py-2'>
        <h3 className='font-semibold text-gray-700'>{book.title}</h3>
        <button
          onClick={toggleSetting}
          className='hover:bg-gray-300 w-8 h-8 rounded-md grid place-content-center'
        >
          <Settings className='w-5 h-5' />
        </button>
      </div>

      {isSetting && (
        <form className='border-2 border-slate-500 mx-3 mb-3 p-3 rounded-md'>
          <Input
            ref={bookTitleRef}
            type='text'
            defaultValue={book.title}
            placeholder='Bookname...'
          />
          <div className='flex items-center justify-between mt-2'>
            <Label
              htmlFor={checkLabelId}
              className='mr-1 cursor-pointer hover:bg-white/10'
            >
              <Checkbox id={checkLabelId} className='mr-2' />
              Del.when.Open
            </Label>
            <div className='flex'>
              <button
                onClick={toggleSetting}
                className='grid place-content-center rounded-md text-gray-600 hover:text-black hover:bg-gray-100 px-2 py-1'
              >
                <RedoIcon className='w-4 h-4 hover:text-slate-500' />
              </button>
              <button className='grid place-content-center rounded-md text-gray-600 hover:text-black hover:bg-gray-100 px-2 py-1'>
                <SaveIcon className='w-4 h-4 hover:text-blue-500' />
              </button>
            </div>
          </div>
        </form>
      )}

      <div className='flex flex-col overflow-hidden'>
        <div className='flex-1 overflow-y-auto px-3'>
          <ul className='space-y-3'>
            {marks.map((mark) => (
              <li key={mark.id} className=''>
                <Mark mark={mark} />
              </li>
            ))}
          </ul>
        </div>
        <div className='m-3 text-right'>
          <Button variant='outline' className=''>
            <PlusIcon className='h-5 w-5' /> Add Mark
          </Button>
        </div>
      </div>
    </div>
  );
}
