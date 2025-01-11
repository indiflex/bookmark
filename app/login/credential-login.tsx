'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
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
  email: z.string().email().optional(),
  passwd: z.string().min(8),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function CredentialLogin() {
  const router = useRouter();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: 'sample@gmail.com',
      passwd: 'password123',
    },
  });

  const onSubmit = (values: FormSchemaType) => {
    console.log('🚀  values:', values);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-2 border p-3'
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
                    className='mt-0'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormFieldInput
            form={form}
            label='password'
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
