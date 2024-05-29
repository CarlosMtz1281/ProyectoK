"use client";

import React from "react";
import { Grid, Typography } from "@mui/material";
import {
  useForm,
  useFormContext,
  FormProvider,
  FormProviderProps,
  FieldValues,
} from "react-hook-form";
import FileUpload from "@/components/MisQuizzes/Admin/EditorDeQuiz/FileUpload";
import ThemeSelection from "@/components/MisQuizzes/Admin/EditorDeQuiz/ThemeSelection";
import AIRecommendation from "@/components/MisQuizzes/Admin/EditorDeQuiz/AIRecommendation";
import EditorBanner from "@/components/MisQuizzes/Admin/EditorDeQuiz/EditorBanner";
import QuizTitle from "@/components/MisQuizzes/Admin/EditorDeQuiz/QuizTitle";
import QuestionPad from "@/components/MisQuizzes/Admin/EditorDeQuiz/QuestionPad";
import axios from "axios";

const defaultThemes = [
  {
      "topic_id": 1,
      "topic_name": "Matematicas"
  },
  {
      "topic_id": 2,
      "topic_name": "cienc"
  },
  {
      "topic_id": 3,
      "topic_name": "Historia"
  }
];

export default function Editor() {
  // Form hook that manages the admin's selections.
  const methods = useForm();
  const { register } = methods;
  

  // We add the admin's id
  register("adminId", { value: localStorage.getItem("user_id") });

  // We save the topics into our website. 
  const [topics, setTopics] = React.useState(defaultThemes);

  const fetchTopics = async () => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/quizes/topics")
      setTopics(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  // We should fetch on render
  React.useEffect(() => {
    fetchTopics();
  }, [])


  // getTopicID isn't working (local db errors probably), but let's try with
  register("topicId", { value: 1 });

  // Submission handler for the form.
  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/quizes", data);
      console.log(response.data);
      alert("Quiz guardado en la DB!")
    } catch (error) {
      console.error(error);
      alert("No se pudo guardar el quiz, intenta de nuevo.")
    }
  };

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
            <Grid id="fcolumn" item xs={12} md={4}>
              <Grid container direction="column" className="h-full">
                <FileUpload />
                <ThemeSelection topics={topics} />
                <AIRecommendation />
              </Grid>
            </Grid>
            {/* Contains inputs for quiz creation: title and question pad */}
            <Grid item xs={12} md={8}>
              <Grid container direction="column" className="h-full w-full">
                <Grid item xs={12} md={2}>
                  <QuizTitle />
                </Grid>
                <Grid item xs={12} md={9}>
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
