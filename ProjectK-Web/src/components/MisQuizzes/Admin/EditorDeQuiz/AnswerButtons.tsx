"use client";

import React from "react";
import { Grid, Typography, Paper, TextField, Pagination, Checkbox } from "@mui/material";
import { useForm, useFormContext } from "react-hook-form";
import IsCorrect from "./IsCorrect";

export default function AnswerButtons() {
  // We retrieve the registration method
  const { register } = useFormContext();

  // We should keep track of the number of questions and the current location
  const [numberOfQuestions, setNumberOfQuestions] = React.useState<number>(10);
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(1);

  return (
      <div id = 'button container' className="flex flex-row flex-nowrap h-full w-full ">
        <div className="flex items-center justify-start w-1/2 h-5/6 ">
          <Paper
            elevation={24}
            className="w-11/12 h-full flex flex-col items-center justify-start"
          >
            <Checkbox className = 'flex self-end mt-3 mr-3' color = "success" />
            <TextField
              multiline={true}
              maxRows={2}
              variant="standard"
              className="w-5/6"
              placeholder="monterrey"
            />
            
          </Paper>
        </div>
        <div className="flex items-center justify-end w-1/2 h-5/6 ">
          <Paper
            elevation={24}
            className="w-11/12 h-full flex flex-col items-center justify-start"
          >
            <Checkbox className = 'flex self-end mt-3 mr-3' color = "success" />
            <TextField
              multiline={true}
              maxRows={2}
              variant="standard"
              className="w-5/6"
              placeholder="monterrey"
            />
            
          </Paper>
        </div>
      </div>
  );
}
