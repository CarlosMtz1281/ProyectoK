import React from "react";
import { Grid, Typography, TextField, Paper } from "@mui/material";
import { FaPencil } from "react-icons/fa6";
import TextFieldComponent from "./TextFieldController";

type ComponentProps = {
  checkForValueInForm: (name: string) => string | string[];
};

export default function QuizTitle({ checkForValueInForm }: ComponentProps) {
  return (
    <div className="flex flex-col h-full w-full gap-6">
      <Paper
        elevation={24}
        className="flex flex-row w-5/6 h-3/4 justify-center items-center"
      >
        <TextFieldComponent name="quiz_name" label="Título" rules={null} />
      </Paper>
    </div>
  );
}
