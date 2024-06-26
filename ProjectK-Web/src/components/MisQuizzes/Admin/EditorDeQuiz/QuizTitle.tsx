import React from "react";
import { Grid, Typography, TextField, Paper } from "@mui/material";
import { FaPencil } from "react-icons/fa6";
import TextFieldComponent from "./TextFieldController";
import { useFormContext } from "react-hook-form";

export default function QuizTitle({isSlug = false} : {isSlug?: boolean}) {
  const { getValues } = useFormContext();
  const titleForm = getValues("quiz_name");
  
  return (
    <div className="flex flex-col h-full w-full gap-6">
      <Paper
        elevation={24}
        className="flex flex-row w-full h-full justify-center items-center"
      >
        <TextFieldComponent name={isSlug ? "quiz_name" : "name"} label="Título" rules={null} value = {titleForm} />
      </Paper>
    </div>
  );
}
