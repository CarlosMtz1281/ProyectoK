"use client";

import React from "react";
import { Paper, TextField, Checkbox } from "@mui/material";
import { useFormContext } from "react-hook-form";
import TextFieldComponent from "./TextFieldController";

export type AnswerButtonProps = {
  name: string,
  label: string,
  rules: any,
  idx: number,
  currentChecked: number,
  onCheck: (ans: number) => void,
  optionIdx?: number,
  isSlug?: boolean
}

export default function AnswerButton({name, label, rules, idx, currentChecked, onCheck, optionIdx = 1000, isSlug = false} : AnswerButtonProps) {
  const { getValues } = useFormContext();
  const nameToPass = isSlug ? "questions."+ (optionIdx - 1) +".options."+(idx - 1) : name;

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onCheck(idx);
    }
  }

  return (
      <div id = 'button container' className="flex flex-row flex-nowrap h-full w-full items-center">
        <div className="flex items-center justify-start w-full h-5/6 ">
          <Paper
            elevation={24}
            className="w-full h-full flex flex-col items-center justify-start gap-1"
          >
            <Checkbox className = 'flex self-end mt-3 mr-3' color = "success" checked = {currentChecked === idx} onChange = {handleCheckbox} />
            <TextFieldComponent name = {nameToPass} label = {label} rules = {rules} />
          </Paper>
        </div>
      </div>
  );
}
