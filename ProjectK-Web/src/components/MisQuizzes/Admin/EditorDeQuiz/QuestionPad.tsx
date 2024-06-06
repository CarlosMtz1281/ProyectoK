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
import AnswerButtons from "./AnswerButton";
import TextFieldComponent from "./TextFieldController";
import IndividualQuestionPad from "./IndividualQuestionPad";

export default function QuestionPad() {
  // We should keep track of the number of questions and the current location
  const [numberOfQuestions, setNumberOfQuestions] = React.useState<number>(5);
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(1);

  // We iterate whenever the pagination changes
  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentQuestion(page);
  };

  return (
    <div className="flex flex-col w-full h-full gap-3">

      
      {Array.from({ length: numberOfQuestions }, (_, index) => (
        <IndividualQuestionPad idx = {index + 1} key={index} currentQuestion={currentQuestion} />
      ))}

      <div
        id="pagination boxybox"
        className="flex flex-row h-full w-full justify-center items-center"
      >
        <Pagination size = "large" variant="outlined" color="primary" onChange={handlePagination} count={numberOfQuestions} />
      </div>
    </div>
  );
}
