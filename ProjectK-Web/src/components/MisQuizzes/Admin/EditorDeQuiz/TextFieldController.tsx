import React, { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

export type TextFieldComponentProps = {
    name: string, 
    label: string, 
    rules: any,
    value?: string
}


const TextFieldComponent = ({ name, label, rules, value = "" }: TextFieldComponentProps) => {
  const { control, formState: { errors } } = useFormContext();
  const [valueInTextField, setValueInTextField] = useState<string | string[]>(value);

  // We handle changes to the textfield component
  const handleInput = (event: any) => {
    const newValue = event.target.value;
    setValueInTextField(newValue);
  }

  // On render, we change the component if value changes
  useEffect(() => {
    setValueInTextField(value);
  }, [value])

  return (
    <Controller
      name={name}
      control={control}
      defaultValue= ""
      render={({ field }) => (
        <TextField
          {...field}
          multiline={true}
          maxRows={2}
          label={label}
          variant="standard"
          className = 'w-5/6'
          error={!!errors[name]}
          value = {valueInTextField}
          onChange={handleInput}
        />
      )}
      rules={rules}
    />
  );
};

export default TextFieldComponent;
