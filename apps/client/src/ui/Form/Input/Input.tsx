import { InputHTMLAttributes } from 'react';
import {
  UseFormRegister,
  FieldValues,
  FieldError,
  FieldErrorsImpl
} from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type: 'text' | 'password' | 'email' | 'number';
  name: string;
  placeholder?: string;
  autocomplete?: 'on' | 'off';
  value?: string;
  label?: string;
  error: FieldError | FieldErrorsImpl | undefined;
  register: UseFormRegister<FieldValues>;
}

const Input = (props: InputProps) => {
  const className = [
    'block',
    'z-0',
    'w-full',
    'bg-var-bg-tertiary',
    'dark:bg-var-bg-tertiary-dark',
    'text-inherit',
    'text-[15px]',
    'rounded-lg',
    'px-4',
    'py-2',
    'transition-colors',
    'duration'
  ];

  if (props.className) className.push(props.className);

  return (
    <fieldset className="flex flex-col gap-2 relative">
      {props.label && (
        <label htmlFor={props.name} className="font-semibold px-1">
          {props.label}
        </label>
      )}
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        className={className.join(' ')}
        autoComplete={props.autocomplete || 'off'}
        id={props.name}
        {...props.register(props.name)}
      />
      <p className="absolute text-red-500 top-0 right-0 text-xs">
        {props.error?.message as string}
      </p>
    </fieldset>
  );
};

export default Input;
