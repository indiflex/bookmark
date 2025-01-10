'use client';

import { HomeIcon } from 'lucide-react';
import { FieldValues, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// import LabelInput from '@/components/ui/label-input';

export default function HookFormSimpleVersion() {
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { isSubmitting, errors },
  } = useForm();

  const submit = (data: FieldValues) => {
    console.log('🚀  data:', data);
  };

  console.log('watch>>', watch('email'));

  useEffect(() => {
    setFocus('nickname');
  }, [setFocus]);

  return (
    <div className='container'>
      <div className='fjb'>
        <h1 className='text-2xl'>react-hook-form - simple version</h1>
        <Link href='/samples'>
          <HomeIcon />
        </Link>
      </div>

      <form onSubmit={handleSubmit(submit)} className='space-y-3'>
        <div className='grid md:grid-cols-3 gap-1 my-2 items-center'>
          <Label htmlFor='nickname' className='text-gray-500'>
            nickname
          </Label>
          <Input
            type='text'
            id='nickname'
            {...register('nickname', { required: 'xxxx' })}
            placeholder='nickname...'
            className='md:col-span-2'
          />
        </div>

        <div className='grid md:grid-cols-3 gap-1 my-2 items-center'>
          <Label htmlFor='email' className='text-gray-500'>
            email
          </Label>
          <Input
            type='text'
            id='email'
            {...register('email', {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid Email Pattern!!',
              },
            })}
            placeholder='email...'
            className='md:col-span-2'
          />
        </div>

        {(errors.nickname || errors.email) && (
          <Alert variant='destructive'>
            <AlertDescription>{`${errors.nickname?.message || errors.email?.message || 'Email!!'}`}</AlertDescription>
          </Alert>
        )}

        {/* <LabelInput label='email' type='email' /> */}

        <Button type='submit' disabled={isSubmitting} variant={'destructive'}>
          Submit
        </Button>
      </form>
    </div>
  );
}
