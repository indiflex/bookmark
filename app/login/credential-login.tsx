'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from '@/lib/i18n-zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import FormFieldInput from '@/components/ui/form-field-input';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  email: z.string().email(),
  passwd: z.string().min(8),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function CredentialLogin() {
  const defaultValues =
    process.env.NODE_ENV !== 'production'
      ? {
          email: 'sample@gmail.com',
          passwd: 'password123',
        }
      : { email: '', passwd: '' };

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const onSubmit = (values: FormSchemaType) => {
    console.log('🚀  values:', values);
  };

  return (
    <>
      <h1 className='text-2xl'>Credentail Login</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-2 text-center'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='email'
                    placeholder='email address...'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormFieldInput
            form={form}
            name='passwd'
            type='password'
            placeholder='password...'
          />

          <Button type='submit' variant={'secondary'} className='w-full'>
            Login
          </Button>
        </form>
      </Form>
    </>
  );
}
