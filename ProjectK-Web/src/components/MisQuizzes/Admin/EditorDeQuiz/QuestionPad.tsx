"use client";

import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Paper,
  Pagination,
  Fab,
  Tooltip,
} from "@mui/material";
import { Add, DeleteForever } from "@mui/icons-material";
import { useFormContext } from "react-hook-form";
import IndividualQuestionPad from "./IndividualQuestionPad";

export default function QuestionPad({
  isSlug = false
}: {
  nQuestions?: number;
  isSlug?: boolean
}) {
  // Form methods
  const { getValues, setValue, watch } = useFormContext();

  // We watch the form's questions
  const questions = watch("questions");

  // If it's on a slug, it should be 1. Else, 10
  const startQuestions = isSlug ? 1 : 10;

  // We should keep track of the number of questions and the current location
  const [numberOfQuestions, setNumberOfQuestions] = React.useState<number>(questions?.length || startQuestions); // Initialize to the length of questions or 1
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(1);

  // We iterate whenever the pagination changes
  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentQuestion(page);
  };

  // We add questions to the form
  const handleAdd = () => {
    setNumberOfQuestions((prevNumberOfQuestions) => prevNumberOfQuestions + 1);

    const updatedQuestions = getValues("questions") || [];
    updatedQuestions.push({}); // An empty object is fine
    setValue("questions", updatedQuestions);
  };

  // We delete the last question
  const handleDelete = () => {
    if (numberOfQuestions <= 1) return;

    setNumberOfQuestions((prevNumberOfQuestions) => prevNumberOfQuestions - 1);

    const updatedQuestions = getValues("questions") || [];
    updatedQuestions.splice(currentQuestion - 1, 1);
    setValue("questions", updatedQuestions);

    if (currentQuestion !== 1) {
      setCurrentQuestion((prevCurr) => prevCurr - 1);
    }
  };

  // Whenever the questions change, we re-render and update numberOfQuestions
  useEffect(() => {
    if (questions) {
      setNumberOfQuestions(questions.length);
      if (questions.length < currentQuestion) {
        setCurrentQuestion(questions.length);
      }
    }
  }, [questions, currentQuestion]);

  return (
    <div className="flex flex-col w-full h-full gap-3">
      {Array.from({ length: numberOfQuestions }, (_, index) => (
        <IndividualQuestionPad
          idx={index + 1}
          key={index}
          currentQuestion={currentQuestion}
          isSlug={isSlug}
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
          page={currentQuestion}
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
