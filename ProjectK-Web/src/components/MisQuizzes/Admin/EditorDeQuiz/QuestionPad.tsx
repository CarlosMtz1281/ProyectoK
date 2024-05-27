"use client";

import React from "react";
import { Grid, Typography, Paper, TextField } from "@mui/material";
import { useForm, useFormContext } from "react-hook-form";

export default function QuestionPad() {
  // We retrieve the registration method
  const { register } = useFormContext();

  // We should keep track of the number of questions and the current location
  const [numberOfQuestions, setNumberOfQuestions] = React.useState<number>(10);
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(1);

  return (
    <div className="flex flex-col w-full h-full gap-12">
      <Paper
        className="flex flex-row h-1/6 items-center justify-center gap-1"
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

      <div className="flex flex-row flex-wrap h-1/4 w-full ">
        <div className="flex items-center justify-start w-1/2 h-5/6">
          <Paper
            elevation={24}
            className="w-11/12 h-5/6 flex items-center justify-center"
          >
            <TextField
              multiline={true}
              maxRows={2}
              variant="standard"
              className="w-5/6"
              placeholder="monterrey"
            />
          </Paper>
        </div>
        <div className="flex items-center justify-end w-1/2 h-5/6">
          <Paper
            elevation={24}
            className="w-11/12 h-5/6 flex items-center justify-center"
          >
            <TextField
              multiline={true}
              maxRows={2}
              variant="standard"
              className="w-5/6"
              placeholder="papulandia"
            />
          </Paper>
        </div>
        <div className="flex items-center justify-start w-1/2 h-5/6">
          <Paper
            elevation={24}
            className="w-11/12 h-5/6 flex items-center justify-center"
          >
            <TextField
              multiline={true}
              maxRows={2}
              variant="standard"
              className="w-5/6"
              placeholder="suisa"
            />
          </Paper>
        </div>
        <div className="flex items-center justify-end w-1/2 h-5/6">
          <Paper
            elevation={24}
            className="w-11/12 h-5/6 flex flex-col items-center justify-center gap-4"
          >
            <button className = 'self-end bg-green-500'>
                correct
            </button>
            <TextField
              multiline={true}
              maxRows={2}
              variant="standard"
              className="w-5/6"
              placeholder="jiji"
            />
          </Paper>
        </div>
      </div>
    </div>
  );
}
