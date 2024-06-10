"use client";

import React from "react";
import {
  Grid,
  Typography,
  Paper,
  TextField,
  Pagination,
  Fab,
  Tooltip,
} from "@mui/material";
import { Add, DeleteForever } from "@mui/icons-material";
import { useForm, useFormContext } from "react-hook-form";
import AnswerButtons from "./AnswerButton";
import TextFieldComponent from "./TextFieldController";
import IndividualQuestionPad from "./IndividualQuestionPad";

export default function QuestionPad({}: {}) {
  // Form methods
  const { unregister, getValues, setValue } = useFormContext();
  // We should keep track of the number of questions and the current location
  const [numberOfQuestions, setNumberOfQuestions] = React.useState<number>(10);
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(1);

  // We iterate whenever the pagination changes
  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentQuestion(page);
  };

  // We add questions to the form
  const handleAdd = (event: any) => {
  setNumberOfQuestions((prevNumberOfQuestions) => prevNumberOfQuestions + 1);

  const questions = getValues('questions');
  questions.push({ /* initial values for the new question */ });
  setValue('questions', questions);
};

  // We delete the last question
  const handleDelete = (event: any) => {
    setNumberOfQuestions((prevNumberOfQuestions) =>
      prevNumberOfQuestions > 1 ? prevNumberOfQuestions - 1 : 1
    );

    const questions = getValues("questions");
    questions.splice(currentQuestion - 1, 1);
    setValue("questions", questions);
  };

  return (
    <div className="flex flex-col w-full h-full gap-3">
      {Array.from({ length: numberOfQuestions }, (_, index) => (
        <IndividualQuestionPad
          idx={index + 1}
          key={index}
          currentQuestion={currentQuestion}
        />
      ))}

      <div
        id="pagination boxybox"
        className="flex flex-row h-full w-full justify-center items-center gap-5"
      >
        <Pagination
          size="large"
          variant="outlined"
          color="primary"
          onChange={handlePagination}
          count={numberOfQuestions}
        />
        <Tooltip title="Add question" placement="top" onClick={handleAdd}>
          <Fab size="medium" color="success">
            <Add />
          </Fab>
        </Tooltip>
        <Tooltip title="Delete question" placement="top" onClick={handleDelete}>
          <Fab size="medium" color="error">
            <DeleteForever />
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
}
