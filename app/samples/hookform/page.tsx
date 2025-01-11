'use client';

import { FieldValues, useForm } from 'react-hook-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Inputs = {
  nickname: string;
  email: string;
};

export default function HookFormPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>();

  const onSubmit = (values: Inputs) => {
    console.log('🚀  values:', values);
  };

  console.log('watch>>', watch('nickname'));

  return (
    <>
      <h1 className='text-3xl'>ReactHookForm</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
        <div>
          <label htmlFor='nickname'>Nickname</label>
          <Input
            {...register('nickname', { required: 'Nickname은 필수값입니다!' })}
            type='text'
            id='nickname'
            name='nickname'
            aria-invalid={!!errors.nickname}
          />
          {errors.nickname?.message && (
            <Alert variant={'destructive'} className='mt-1 p-1 border-0'>
              <AlertDescription>
                {errors.nickname.message + ''}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div>
          <Label htmlFor='email'>email</Label>
          <Input
            {...register('email', {
              required: '이메일은 필수값입니다!',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '이메일 형식을 지켜주세요!',
              },
            })}
            id='email'
            name='email'
            type='email'
            placeholder='email...'
          />
          <div className='text-red'>{`${errors.email?.message || ''}`}</div>
        </div>

        <Button type='submit' disabled={isSubmitting} className='w-full'>
          Submit
        </Button>
      </form>
    </>
  );
}
