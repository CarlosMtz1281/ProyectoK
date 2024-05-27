import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

export type TextFieldComponentProps = {
    name: string, 
    label: string, 
    rules: any
}

const TextFieldComponent = ({ name, label, rules }: TextFieldComponentProps) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue= ""
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant="standard"
          className = 'w-5/6'
          error={!!errors[name]}
        />
      )}
      rules={rules}
    />
  );
};

export default TextFieldComponent;
