'use client';

/* eslint-disable @next/next/no-img-element */
import {
  CloudCog,
  Loader,
  PencilIcon,
  RedoIcon,
  SaveIcon,
  Trash2Icon,
} from 'lucide-react';
import { Button } from './ui/button';
import { useReducer, useRef, useState } from 'react';
import { Input } from './ui/input';

export type Mark = {
  id: number;
  book: number;
  url: string;
  title: string;
  descript: string;
  image: string;
  isdel: boolean;
};

type Props = {
  mark: Mark;
};

export default function Mark({ mark }: Props) {
  const [isEditing, toggleEditing] = useReducer((p) => !p, false);
  const [isScraping, setScraping] = useState(false);

  const urlRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {isEditing ? (
        <form className='border-2 border-slate-500 p-3 rounded-md'>
          <div>
            <div className='flex gap-2'>
              <Input ref={urlRef} type='url' placeholder='sample.com...' />
              <Button
                variant='outline'
                disabled={isScraping}
                className='text-green-500'
              >
                {isScraping ? (
                  <Loader className='animate-spin' />
                ) : (
                  <CloudCog />
                )}
              </Button>
            </div>

            <div className='my-2'>
              <Input
                type='text'
                defaultValue='BookTitle'
                placeholder='BookTitle...'
              />
            </div>
            <div>
              <Input type='text' defaultValue='' placeholder='Description...' />
            </div>

            <div className='flex mt-2 justify-end'>
              <button
                onClick={toggleEditing}
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
      ) : (
        <div className='group bg-white p-2 shadow rounded-md border-b  hover:bg-gray-100 grid grid-cols-3 gap-1 cursor-pointer'>
          <div className='text-center p-1 mr-2 border group-hover:border-gray-500 flex justify-center rounded-md'>
            <img
              src={mark.image || '/next.svg'}
              alt={mark.title!}
              width={60}
              title={mark.descript || mark.title}
              className='opacity-70 group-hover:opacity-100 rounded max-h-60'
            />
          </div>
          <div className='col-span-2'>
            <h3 className='font-semibold text-gray-700 truncate group-hover:underline'>
              {mark.title} asdfsad safddfas
            </h3>
            <p className='text-xs truncate text-gray-500'>{mark.descript}</p>
            <div className='justify-end hidden flexx group-hover:flex p-0 gap-2'>
              <button
                onClick={toggleEditing}
                className='grid place-content-center rounded-md text-gray-600 hover:text-black hover:bg-gray-200 px-2 py-1'
              >
                <PencilIcon className='w-4 h-4' />
              </button>
              <button className='grid place-content-center rounded-md text-gray-600 hover:text-black hover:bg-gray-200 px-2 py-1'>
                <Trash2Icon className='w-4 h-4 text-red-500' />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
