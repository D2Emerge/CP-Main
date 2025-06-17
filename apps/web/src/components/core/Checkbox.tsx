import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import {Check} from '@src/assets/icons/Check';

interface CheckboxProps {
  name?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  label?: string;
  highlighted?: boolean;
  rounded?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({name, ...props}) => {
  const context = useFormContext();

  if (name && context) {
    return (
      <Controller
        name={name}
        control={context.control}
        render={({field}) => (
          <CheckboxComponent
            {...props}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    );
  }

  return <CheckboxComponent {...props} />;
};

const CheckboxComponent: React.FC<Omit<CheckboxProps, 'name'>> = ({
  value,
  onChange,
  disabled,
  label,
  highlighted,
  rounded,
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!value);
    }
  };

  const baseClasses =
    'flex items-center gap-2 p-2 cursor-pointer transition-colors';
  const highlightClass = highlighted ? 'bg-light-orange' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const roundedClass = rounded ? 'rounded-xl' : 'rounded-md';

  return (
    <div
      onClick={handleClick}
      className={`${baseClasses} ${highlightClass} ${disabledClass}`}>
      <div
        className={`w-5 h-5 border ${roundedClass} flex items-center justify-center transition-all duration-200 ${
          value ? 'bg-black border-black' : 'bg-white border-gray-400'
        }`}>
        {value && <Check width={14} height={10} color="white" />}
      </div>
      {label && <span className="select-none">{label}</span>}
    </div>
  );
};
