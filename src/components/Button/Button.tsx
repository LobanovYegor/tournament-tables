import { cva, type VariantProps } from 'class-variance-authority';
import cn from 'clsx';

import tailSpin from '../../assets/tail-spin.svg';

type ButtonProps = {
  className?: string;
  loading?: boolean;
  disabled?: boolean;
} & VariantProps<typeof buttonVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const buttonVariants = cva(
  'flex items-center justify-center font-semibold transition-all relative outline-0',
  {
    variants: {
      size: {
        sm: 'h-6 px-2 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-14 px-6 text-lg',
      },
      intent: {
        solid: 'bg-primary-400 text-white',
        outline: 'border border-primary-400 text-primary-400',
        ghost: 'text-primary-400',
      },
      disabled: {
        false: null,
        true: 'disabled:cursor-not-allowed',
      },
      loading: {
        false: null,
        true: 'cursor-not-allowed',
      },
    },
    compoundVariants: [
      {
        intent: 'solid',
        disabled: false,
        loading: false,
        class: 'hover:bg-primary-500 active:bg-primary-600 cursor-pointer',
      },
      {
        intent: 'solid',
        disabled: true,
        class: 'disabled:bg-gray-400 disabled:text-gray-300',
      },
      {
        intent: 'outline',
        disabled: false,
        loading: false,
        class: 'hover:bg-primary-100 active:bg-primary-200 cursor-pointer',
      },
      {
        intent: 'outline',
        disabled: true,
        class: 'disabled:text-gray-300 disabled:border-gray-300',
      },
      {
        intent: 'ghost',
        disabled: false,
        loading: false,
        class: 'hover:bg-primary-100 active:bg-primary-200 cursor-pointer',
      },
      {
        intent: 'ghost',
        disabled: true,
        class: 'disabled:text-gray-300',
      },
    ],
    defaultVariants: {
      size: 'md',
      intent: 'solid',
      disabled: false,
    },
  }
);

const loaderVariants = cva('absolute animate-spin', {
  variants: {
    size: {
      sm: 'scale-50',
      md: 'scale-75',
      lg: 'scale-100',
    },
    intent: {
      solid: 'white',
      outline: 'primary',
      ghost: 'primary',
    },
  },
  defaultVariants: {
    size: 'md',
    intent: 'solid',
  },
});

export function Button({
  className,
  size,
  intent,
  loading = false,
  disabled = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ size, intent, loading, disabled }),
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <img
          src={tailSpin}
          alt="loader"
          className={cn(loaderVariants({ size, intent }))}
        />
      )}
      <span className={cn(loading ? 'opacity-0' : 'opacity-100')}>
        {children}
      </span>
    </button>
  );
}
