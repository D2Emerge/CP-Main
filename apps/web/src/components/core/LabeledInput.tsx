import React, {forwardRef, useEffect, useState} from 'react';
import {FieldError} from 'react-hook-form';

import {InfoCircle} from '@src/assets/icons/InfoCircle';

interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  error: FieldError | undefined;
}

const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
  ({label, error, value, placeholder, ...props}, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [actualValue, setActualValue] = useState('');

    useEffect(() => {
      if (ref && typeof ref === 'object' && ref.current) {
        setActualValue(ref.current.value);
      }
    }, [value, ref]);

    const shouldFloat =
      isFocused ||
      (value !== undefined && value !== null && value !== '') ||
      (actualValue !== undefined &&
        actualValue !== null &&
        actualValue !== '') ||
      (props.defaultValue !== undefined &&
        props.defaultValue !== null &&
        props.defaultValue !== '');

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          value={value}
          placeholder={placeholder}
          className={[
            'w-full rounded-md border px-3 py-2 focus:outline-none transition-all duration-200, bg-white',
            '[&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_white]',
            '[&:-webkit-autofill:hover]:shadow-[inset_0_0_0px_1000px_white]',
            '[&:-webkit-autofill:focus]:shadow-[inset_0_0_0px_1000px_white]',
            'floating-label input:not(:placeholder-shown) ~ label, floating-label input:-webkit-autofill ~ label, floating-label input:autofill ~ label',
            error
              ? 'border-danger focus:ring-0 focus:ring-danger'
              : 'border-gray-300 focus:ring-0 focus:ring-stroke focus:border-dark',
          ]
            .filter(Boolean)
            .join(' ')}
          onFocus={e => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={e => {
            setIsFocused(false);

            setActualValue(e.target.value);
            props.onBlur?.(e);
          }}
          onChange={e => {
            setActualValue(e.target.value);
            props.onChange?.(e);
          }}
          autoComplete="off"
        />
        {label && (
          <label
            className={[
              'absolute left-3 transition-all duration-200 pointer-events-none font-medium',
              shouldFloat
                ? 'left-2 text-xs bg-white -translate-y-1.5 -translate-x-1 px-1 text-txt-secondary'
                : 'top-3 left-3 text-sm text-txt-secondary',
              error
                ? 'text-danger'
                : shouldFloat
                  ? 'text-txt-secondary'
                  : 'text-txt-secondary',
            ]
              .filter(Boolean)
              .join(' ')}>
            {label}
          </label>
        )}
        {error && (
          <div className="flex items-center gap-2">
            <InfoCircle
              className="text-danger absolute top-2 right-1 -translate-x-1 translate-y-0.5"
              width={21.5}
              height={21.5}
              fill="red"
            />
            <p className="text-danger text-sm mt-1">{error.message}</p>
          </div>
        )}
      </div>
    );
  }
);

LabeledInput.displayName = 'LabeledInput';

export {LabeledInput};
