"use client";

import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import ThemeUpload from "@/components/MisQuizzes/Admin/EditorDeQuiz/ThemeUpload";
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

// Default JSON for testing
const defaultQuizJson = {
  quiz_id: 14,
  admin_id: 7,
  topic_id: 1,
  quiz_name: "quizcreadoenelclient3",
  topic_name: "Matematicas",
  questions: [
    {
      question_id: 21,
      question: "holi",
      options: ["me la p", "yoo", "rah", ""],
      correct_answer: 1,
      active: true,
      answer: 1,
      opcion2: "",
      opcion3: "",
      opcion4: "",
    },
    {
      question_id: 22,
      question: "",
      options: ["", "", "", ""],
      correct_answer: 1,
      active: true,
      answer: 1,
      opcion2: "",
      opcion3: "",
      opcion4: "",
    },
    {
      question_id: 23,
      question: "",
      options: ["", "", "", ""],
      correct_answer: 1,
      active: true,
      answer: 1,
      opcion2: "",
      opcion3: "",
      opcion4: "",
    },
    {
      question_id: 24,
      question: "",
      options: ["", "", "", ""],
      correct_answer: 1,
      active: true,
      answer: 1,
      opcion2: "",
      opcion3: "",
      opcion4: "",
    },
    {
      question_id: 25,
      question: "",
      options: ["", "", "", ""],
      correct_answer: 1,
      active: true,
      answer: 1,
      opcion2: "",
      opcion3: "",
      opcion4: "",
    },
  ],
  topicId: 1,
};

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

export default function Editor({ params }: { params: { id: string } }) {
  const methods = useForm();
  const { register, setValue, reset, getValues } = methods;
  const [topics, setTopics] = useState(defaultThemes);
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = Number(await getCookie("user_id"));
      const report_id = params.id;
      setValue("adminId", userId);
      const userCookiesObj = JSON.parse(await getCookie("userCookies"));
      const session = userCookiesObj.sessionKey;
      console.log(session);

      // setQuizData(defaultQuizJson);
      // reset(defaultQuizJson);

      try {
        console.log(apiURL + `quizes/quizId/${report_id}`);
        const res = await axios
          .get(apiURL + `quizes/quizId/${report_id}`, {
            headers: { sessionKey: session },
          })
          .then((res) => {
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
        const userCookiesObj = JSON.parse(await getCookie("userCookies"));
        const session = userCookiesObj.sessionKey;
        const res = await axios.get(`${apiURL}quizes/topics/get`, {
          headers: {
            sessionKey: session
          }
        } );
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

  // Handles form submission
  const onSubmit = async (data: FieldValues) => {
    try {
      console.log("form: ", getValues());
      const userCookiesObj = JSON.parse(await getCookie("userCookies"));
      const session = userCookiesObj.sessionKey;
      const response = await axios.put(`${apiURL}quizes`, data, {
        headers: {
          sessionKey: session
        }
      });
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
    alert("Llena todos los espacios necesarios para continuar.");
    console.log("Form Errors:", errors);
    console.log("form", getValues());
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <div className="h-screen m-2">
          <EditorBanner />
          <Grid
            container
            direction="column"
            className="h-full overflow-x-visible flex-nowrap"
            gap={3}
          >
            <Grid item xs={12} md={1}>
              <Grid
                container
                direction="row"
                className="h-full justify-between"
              >
                <ThemeUpload />
                <ThemeSelection isSlug = {true} topics={topics} />
                <Grid item md={4}>
                  <QuizTitle isSlug = {true} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container direction="column" className="h-full w-full ">
                <Grid item xs={12} md={12}>
                  <QuestionPad isSlug = {true} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </form>
    </FormProvider>
  );
}
