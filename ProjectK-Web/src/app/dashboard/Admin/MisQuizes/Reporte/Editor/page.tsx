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

interface Option {
  question_id: number;
  question: string;
  options: string[];
  correct_answer: number;
  active: boolean;
}

interface QuizData {
  admin_id: number;
  questions: Option[];
  quiz_id: number;
  quiz_name: string;
  topic_id: number;
  topic_name: string;
}

export default function Editor() {
  const methods = useForm();
  const { register, setValue, reset, getValues } = methods;
  const [userIdLocal, setUserIdLocal] = useState<number | null>(null);
  const [topics, setTopics] = useState(defaultThemes);
  const [reportId, setReportId] = useState(1);
  const [quizData, setQuizData] = useState({} as QuizData);
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = Number(await getCookie("user_id"));
      const report_id = Number(await getCookie("ID"));

      setUserIdLocal(userId);
      setValue("adminId", userId);
      setReportId(report_id);

      try {
        const res = await axios
          .get(apiURL + `quizes/${report_id}`)
          .then((res) => {
            setQuizData(res.data);
            reset(res.data);
            console.log(res.data);
            console.log(getValues());
          });
      } catch (error) {
        console.log(error);
      }
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
    // fetchTopics();
  }, [setValue, apiURL]);

  useEffect(() => {
    setValue("topicId", 1);
  }, [setValue]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.put(`${apiURL}quizes`, data);
      console.log(response.data);
      alert("Quiz guardado en la DB!");
    } catch (error) {
      console.error(error);
      alert("No se pudo guardar el quiz, intenta de nuevo.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="h-screen m-2">
          <EditorBanner />
          <Grid container direction="row" className="h-full">
            <Grid item xs={12} md={4}>
              <Grid container direction="column" className="h-full">
                <FileUpload />
                <ThemeSelection topics={topics} />
                <Grid item md={3}>
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
