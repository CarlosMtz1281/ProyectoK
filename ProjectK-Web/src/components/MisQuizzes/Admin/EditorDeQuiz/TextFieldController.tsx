import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

export type TextFieldComponentProps = {
  name: string;
  label: string;
  rules: any;
  value?: string;
  required?: boolean;
};

const TextFieldComponent = ({
  name,
  label,
  rules,
  required,
  value = "",
}: TextFieldComponentProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value } }) => (
        <TextField
          multiline={true}
          maxRows={2}
          label={label}
          variant="standard"
          className="w-5/6"
          error={!!errors[name]}
          value={value}
          onChange={onChange}
        />
      )}
      rules={{ required: true }}
    />
  );
};

export default TextFieldComponent;
