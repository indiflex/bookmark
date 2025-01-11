import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Input } from './input';

type Props<T extends FieldValues, U> = {
  // type Props<U> = {
  form: UseFormReturn<T, U, FieldValues | undefined>;
  name: Path<T>;
  label?: string;
  type?: string;
  hideMessage?: boolean;
  placeholder?: string;
};

export default function FormFieldInput<T extends FieldValues, U>({
  form,
  name,
  label = '',
  type,
  hideMessage,
  placeholder,
}: Props<T, U>) {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input
                {...field}
                type={type || 'text'}
                placeholder={`${placeholder || label || ''}${placeholder ? '' : label && '...'}`}
              />
            </FormControl>
            {!hideMessage && <FormMessage />}
          </FormItem>
        )}
      />
    </>
  );
}
