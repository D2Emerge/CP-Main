import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';

interface SwitchProps {
  name?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  name,
  value,
  onChange,
  disabled,
}) => {
  const context = useFormContext();

  if (name && context) {
    return (
      <Controller
        name={name}
        control={context.control}
        render={({field}) => (
          <SwitchComponent
            value={field.value}
            onChange={field.onChange}
            disabled={disabled}
          />
        )}
      />
    );
  }

  return (
    <SwitchComponent value={value} onChange={onChange} disabled={disabled} />
  );
};

const SwitchComponent: React.FC<SwitchProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!value);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative inline-block w-[50px] h-[28px] rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
        value ? 'bg-secondary-orange' : 'bg-grey'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-[22px] h-[22px] bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
          value ? 'translate-x-[24px]' : 'translate-x-[4px]'
        }`}
      />
    </div>
  );
};
