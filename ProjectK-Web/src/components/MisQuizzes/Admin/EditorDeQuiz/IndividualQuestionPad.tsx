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
import AnswerButton from "./AnswerButton";
import TextFieldComponent from "./TextFieldController";

export type IndividualQuestionPad = {
  currentQuestion: number;
  idx: number;
};

export default function IndividualQuestionPad({
  currentQuestion,
  idx,
}: IndividualQuestionPad) {
  const { register, setValue, getValues } = useFormContext();
  const ans = getValues(`questions.${idx - 1}.correct_answer`);
  const question = getValues(`questions.${idx - 1}.question`);

  // Registramos la respuesta correcta (inicia siempre en 1)
  register(`questions.${idx - 1}.answer`, {value : ans ?? 1});
  // Registramos que está activa
  register(`questions.${idx - 1}.active`, {value: true})
  const [checkedAns, setCheckedAns] = React.useState(1);

  const onCheck = (ans: number) => {
    setCheckedAns(ans);
    setValue(`questions.${idx - 1}.answer`, ans);
  };

  return (
    <div
      style={{ display: currentQuestion === idx ? "" : "none" }}
      className="w-full h-full"
    >
      <Paper
        className="flex flex-row h-2/6 items-center justify-center gap-1"
        elevation={24}
      >
        <TextFieldComponent
          name={`questions.${idx - 1}.question`}
          label={`Pregunta N. ${idx}`}
          rules={null}
          value = {question}
          required = {true}
        />
      </Paper>

      <div
        id="buttonsbox"
        className="w-full h-full grid grid-cols-2 grid-rows-2 gap-4 mt-2"
      >
        <AnswerButton
          name={`questions.${idx - 1}.opcion1`}
          label="Respuesta 1"
          rules={null}
          idx={1}
          optionIdx={idx}
          currentChecked={checkedAns}
          onCheck={onCheck}
        />
        <AnswerButton
          name={`questions.${idx - 1}.opcion2`}
          label="Respuesta 2"
          rules={null}
          idx={2}
          optionIdx={idx}
          currentChecked={checkedAns}
          onCheck={onCheck}
        />
        <AnswerButton
          name={`questions.${idx - 1}.opcion3`}
          label="Respuesta 3"
          rules={null}
          idx={3}
          optionIdx={idx}
          currentChecked={checkedAns}
          onCheck={onCheck}
        />
        <AnswerButton
          name={`questions.${idx - 1}.opcion4`}
          label="Respuesta 4"
          rules={null}
          idx={4}
          optionIdx={idx}
          currentChecked={checkedAns}
          onCheck={onCheck}
        />
      </div>
    </div>
  );
}
