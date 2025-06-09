import React, {forwardRef, useState} from 'react';
import {FieldError} from 'react-hook-form';

interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error: FieldError | undefined;
}

const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
  ({label, error, value, ...props}, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const shouldFloat = isFocused || (value && value.toString().length > 0);

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          value={value}
          className={[
            'w-full rounded-md border px-3 py-2 focus:outline-none transition-all duration-200, bg-gray-50',
            '[&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgb(249_250_251)]',
            '[&:-webkit-autofill:hover]:shadow-[inset_0_0_0px_1000px_rgb(249_250_251)]',
            '[&:-webkit-autofill:focus]:shadow-[inset_0_0_0px_1000px_rgb(249_250_251)]',
            error
              ? 'border-red-500 focus:ring-2 focus:ring-red-500'
              : 'border-gray-300 focus:ring-2 focus:ring-blue-500',
          ]
            .filter(Boolean)
            .join(' ')}
          onFocus={e => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={e => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
        />
        {label && (
          <label
            className={[
              'absolute left-3 transition-all duration-200 pointer-events-none font-medium',
              shouldFloat
                ? 'left-2 text-xs -translate-y-2 bg-gray-50 px-1'
                : 'top-2.5 left-3 text-sm',
              error
                ? 'text-red-500'
                : shouldFloat
                  ? 'text-blue-500'
                  : 'text-gray-500',
            ]
              .filter(Boolean)
              .join(' ')}>
            {label}
          </label>
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  }
);

LabeledInput.displayName = 'LabeledInput';

export {LabeledInput};
