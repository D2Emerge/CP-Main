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
            'w-full rounded-md border px-3 py-2 focus:outline-none transition-all duration-200, bg-custom-white',
            '[&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_white]',
            '[&:-webkit-autofill:hover]:shadow-[inset_0_0_0px_1000px_white]',
            '[&:-webkit-autofill:focus]:shadow-[inset_0_0_0px_1000px_white]',
            error
              ? 'border-red-500 focus:ring-0 focus:ring-red-500'
              : 'border-gray-300 focus:ring-0 focus:ring-custom-stroke',
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
                ? 'left-2 text-xs bg-custom-white -translate-y-2  px-1 text-custom-txt-secondary'
                : 'top-2.5 left-3 text-sm text-custom-txt-secondary',
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
