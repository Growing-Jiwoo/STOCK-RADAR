import { S } from './styled';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  error?: string | undefined;
  register: UseFormRegisterReturn<string>;
}

export function InputField({
  type,
  placeholder,
  value,
  error,
  register,
}: InputFieldProps) {
  return (
    <>
      <S.Input
        type={type}
        placeholder={placeholder}
        value={value}
        {...register}
      />
      {error && <span>{error}</span>}
    </>
  );
}
