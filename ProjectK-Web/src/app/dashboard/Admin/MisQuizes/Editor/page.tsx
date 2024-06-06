"use client";

import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import FileUpload from "@/components/MisQuizzes/Admin/EditorDeQuiz/FileUpload";
import ThemeSelection from "@/components/MisQuizzes/Admin/EditorDeQuiz/ThemeSelection";
import AIRecommendation from "@/components/MisQuizzes/Admin/EditorDeQuiz/AIRecommendation";
import EditorBanner from "@/components/MisQuizzes/Admin/EditorDeQuiz/EditorBanner";
import QuizTitle from "@/components/MisQuizzes/Admin/EditorDeQuiz/QuizTitle";
import QuestionPad from "@/components/MisQuizzes/Admin/EditorDeQuiz/QuestionPad";
import axios from "axios";
import { getCookie } from "@/app/utils/getcookie";

const defaultThemes = [
  {
    topic_id: 1,
    topic_name: "Matematicas",
  },
  {
    topic_id: 2,
    topic_name: "Ciencias",
  },
  {
    topic_id: 3,
    topic_name: "Historia",
  },
];

export default function Editor() {
  const methods = useForm();
  const { register, setValue } = methods;
  const [userIdLocal, setUserIdLocal] = useState<number | null>(null);
  const [topics, setTopics] = useState(defaultThemes);
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUserId = async () => {
      const userCookies = await getCookie("userCookies");
      const userCookiesObj = JSON.parse(userCookies);
      const userId = Number(userCookiesObj.user_id);
      setUserIdLocal(userId);
      setValue("adminId", userId);
    };

    const fetchTopics = async () => {
      try {
        const res = await axios.get(`${apiURL}quizes/topics`);
        setTopics(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserId();
    fetchTopics();
  }, [setValue, apiURL]);

  useEffect(() => {
    setValue("topicId", 1);
  }, [setValue]);

  const onSubmit = async (data: FieldValues) => {
    const userCookiesObj = JSON.parse(await getCookie("userCookies"));
    console.log(userCookiesObj);
    const session = userCookiesObj.sessionKey;
    try {
      const response = await axios.post(`${apiURL}quizes/${session}`, data);
      console.log(response.data);
      alert("Quiz guardado en la DB!");
    } catch (error) {
      console.error(error);
      alert("No se pudo guardar el quiz, intenta de nuevo.");
    }
  };

  // Form error handler
  const onError = (errors: any) => {
    // Show an alert with the error messages
    alert('Llena todos los espacios necesarios para continuar.');
    console.log('Form Errors:', errors);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <div className="h-screen m-2">
          <EditorBanner />
          <Grid container direction="row" className="h-full">
            <Grid item xs={12} md={4}>
              <Grid container direction="column" className="h-full">
                <FileUpload />
                <ThemeSelection topics={topics} />
                <Grid item xs={3} md={3}>
                  <QuizTitle />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container direction="column" className="h-5/6 w-full">
                <Grid item xs={12} md={12}>
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
