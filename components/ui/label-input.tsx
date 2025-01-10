import { useId } from 'react';
import { cn } from '@/lib/utils';
import { Input } from './input';
import { Label } from './label';

type Props = {
  label: string;
  type?: string;
  className?: string;
};
export default function LabelInput({ label, type, className }: Props) {
  const inputId = useId();

  return (
    <div
      className={cn('grid md:grid-cols-3 gap-1 my-2 items-center', className)}
    >
      <Label htmlFor={inputId} className='text-gray-500'>
        {label}
      </Label>
      <Input
        type={type || 'text'}
        id={inputId}
        placeholder={`${label}...`}
        className='md:col-span-2'
      />
    </div>
  );
}
