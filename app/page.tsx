import { PlusIcon, Settings } from 'lucide-react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import Book from '@/components/Book';

export default async function Home() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/login');
  }

  const books = await prisma.book.findMany();
  console.log('🚀  books:', books);

  return (
    <div className='flex flex-col h-full'>
      <div className='flex justify-between items-center p-2'>
        <h1 className='text-xl font-semibold'>
          {session?.user?.name}&apos;s BookCase
        </h1>
        <div>
          <button className='inline-flex items-center bg-black/10 hover:text-white font-medium text-sm rounded-md py-2 px-3'>
            <Settings className='w-5 h-5' />
          </button>
        </div>
      </div>

      <div className='flex-1 overflow-x-auto mx-3'>
        <div className='inline-flex h-full items-start space-x-3'>
          {books?.map((book) => <Book key={book.id} book={book} />)}
          <div className='w-72'>
            <button className='flex items-center bg-white/10 hover:bg-white/20 text-white p-2 text-sm font-medium rounded-md w-full'>
              <PlusIcon className='h-5 w-5' /> Add Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
