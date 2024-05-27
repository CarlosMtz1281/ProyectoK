"use client";

import React from "react";
import { Grid, Typography } from "@mui/material";
import {
  useForm,
  useFormContext,
  FormProvider,
  FormProviderProps,
  FieldValues
} from "react-hook-form";
import FileUpload from "@/components/MisQuizzes/Admin/EditorDeQuiz/FileUpload";
import ThemeSelection from "@/components/MisQuizzes/Admin/EditorDeQuiz/ThemeSelection";
import AIRecommendation from "@/components/MisQuizzes/Admin/EditorDeQuiz/AIRecommendation";
import EditorBanner from "@/components/MisQuizzes/Admin/EditorDeQuiz/EditorBanner";
import QuizTitle from "@/components/MisQuizzes/Admin/EditorDeQuiz/QuizTitle";
import QuestionPad from "@/components/MisQuizzes/Admin/EditorDeQuiz/QuestionPad";

export default function Editor() {
  // Form hook that manages the admin's selections.
  const methods = useForm();

  // Submission handler for the form.
  const onSubmit = (data: FieldValues) => console.log(data); // we just print it for now

  return (
    // Provides context to the form
    <FormProvider {...methods}>
        {/* Passes methods into children */}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="h-screen m-2">
          <EditorBanner />
          <Grid
            id="maingridbelowtheheada"
            container
            direction="row"
            className="h-full"
          >
            {/* This item will contain the first column */}
            <Grid id="fcolumn" item xs={4}>
              <Grid container direction="column" className="h-full">
                <FileUpload />
                <ThemeSelection />
                <AIRecommendation />
              </Grid>
            </Grid>
            {/* Contains inputs for quiz creation: title and question pad */}
            <Grid item xs={8}>
              <Grid container direction="column" className="h-full w-full">
                <Grid item xs={2}>
                  <QuizTitle />
                </Grid>
                <Grid item xs={10}>
                  <QuestionPad />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </form>
    </FormProvider>
  );
}
