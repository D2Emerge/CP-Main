import {ButtonHTMLAttributes, ReactNode} from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outlined' | 'ads' | 'txt';
  size?: 'xs' | 'sm' | 'md';
  isIconOnly?: boolean;
  className?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isIconOnly = false,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-dark text-white ',
    secondary: 'bg-main-yellow text-black',
    outlined: 'bg-white text-black border border-dark',
    ads: 'text-white bg-additional',
    txt: 'bg-transparent text-txt-secondary font-normal',
  };

  const sizeStyles = {
    xs: 'px-3 py-1.5 text-sm',
    sm: 'px-4 py-2 text-base',
    md: 'px-5 py-2.5 text-lg',
  };

  const iconOnlySizeStyles = {
    xs: 'p-1',
    sm: 'p-2.5',
    md: 'p-3',
  };

  const sizeClassName = isIconOnly
    ? iconOnlySizeStyles[size]
    : sizeStyles[size];

  return (
    <button
      {...props}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeClassName} ${className || ''}`}>
      {children}
    </button>
  );
};
