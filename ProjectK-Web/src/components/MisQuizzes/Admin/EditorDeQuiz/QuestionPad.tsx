"use client";

import React from "react";
import {
  Grid,
  Typography,
  Paper,
  TextField,
  Pagination,
  Fab,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useForm, useFormContext } from "react-hook-form";
import AnswerButtons from "./AnswerButtons";

export default function QuestionPad() {
  // We retrieve the registration method
  const { register } = useFormContext();

  // We should keep track of the number of questions and the current location
  const [numberOfQuestions, setNumberOfQuestions] = React.useState<number>(10);
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(1);

  return (
    <div className="flex flex-col w-full h-full gap-6">
      <Typography variant="h6" className="font-thin font-serif">
        Preguntas:
      </Typography>
      <Paper
        className="flex flex-row h-2/6 items-center justify-center gap-1"
        elevation={24}
      >
        <TextField
          multiline={true}
          maxRows={2}
          variant="standard"
          className="w-5/6"
          placeholder="Cuál es tu país favorito?"
        />
      </Paper>

      <div id="buttonsbox" className="w-full h-full flex flex-col">
        <AnswerButtons />
        <AnswerButtons />
      </div>

      <div
        id="pagination boxybox"
        className="flex flex-row h-full w-full justify-center gap-3"
      >
        <Pagination count={10} />
        <Fab size="small">
          <Add />
        </Fab>
      </div>
    </div>
  );
}
