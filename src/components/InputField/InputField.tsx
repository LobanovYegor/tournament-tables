import { cva } from 'class-variance-authority';
import cn from 'clsx';
import { FC } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const labelVariants = cva('font-medium', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const inputVariants = cva(
  'border-0 border-b-1 border-b-gray-500 focus:border-b-amber-500 outline-0 w-full p-2 bg-gray-50 focus:bg-gray-100',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      error: {
        true: 'border-b-red-500 focus:ring-red-200',
        false: 'mb-5 border-gray-300 focus:ring-blue-200',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  }
);

const errorVariants = cva('text-red-600', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const InputField: FC<InputFieldProps> = ({
  name,
  label,
  type = 'text',
  required = false,
  size = 'md',
  className,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldError | undefined;

  return (
    <div className={cn('flex flex-col', className)}>
      <label className={labelVariants({ size })} htmlFor={name}>
        {label}:
      </label>
      <input
        className={inputVariants({ size, error: !!error })}
        id={name}
        type={type}
        {...register(name, { required })}
      />
      {error && (
        <span className={errorVariants({ size })}>
          {error.message || 'This field is required'}
        </span>
      )}
    </div>
  );
};
