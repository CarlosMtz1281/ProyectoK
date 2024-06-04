import React from "react";
import { Grid, Typography, TextField, Paper } from "@mui/material";
import { FaPencil } from "react-icons/fa6";
import TextFieldComponent from "./TextFieldController";
import { useFormContext } from "react-hook-form";

export default function QuizTitle() {
  const { getValues } = useFormContext();
  const titleForm = getValues("quiz_name");
  
  return (
    <div className="flex flex-col h-full w-full gap-6">
      <Paper
        elevation={24}
        className="flex flex-row w-5/6 h-3/4 justify-center items-center"
      >
        <TextFieldComponent name="quiz_name" label="Título" rules={null} value = {titleForm} />
      </Paper>
    </div>
  );
}
