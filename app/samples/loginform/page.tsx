import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginHookForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoginError('');
      // 여기에 실제 로그인 로직을 구현하세요
      console.log('Form submitted:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 로딩 시뮬레이션
    } catch (error) {
      console.error(error);
      setLoginError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl text-center'>로그인</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='email' className='block text-sm font-medium'>
              이메일
            </label>
            <input
              {...register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '유효한 이메일 주소를 입력해주세요',
                },
              })}
              type='email'
              id='email'
              className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='name@example.com'
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label htmlFor='password' className='block text-sm font-medium'>
              비밀번호
            </label>
            <div className='relative'>
              <input
                {...register('password', {
                  required: '비밀번호를 입력해주세요',
                  minLength: {
                    value: 8,
                    message: '비밀번호는 최소 8자 이상이어야 합니다',
                  },
                })}
                type={showPassword ? 'text' : 'password'}
                id='password'
                className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='********'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-2 top-1/2 transform -translate-y-1/2'
              >
                {showPassword ? (
                  <EyeOff className='h-5 w-5 text-gray-500' />
                ) : (
                  <Eye className='h-5 w-5 text-gray-500' />
                )}
              </button>
            </div>
            {errors.password && (
              <p className='text-sm text-red-500'>{errors.password.message}</p>
            )}
          </div>

          {loginError && (
            <Alert variant='destructive'>
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
