"use-client"
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Slider from "@mui/material/Slider";

import "@/styles/QuizExperimental.css";
import { IoIosClose } from "react-icons/io";
import profile from "@/../public/profileIcon.svg";
import QuizBreak from "./QuizBreak";
import { set } from "firebase/database";
import axios from "axios";

interface QuizProps {
  // Define the props for your component here
  onClose: () => void;
  quizId: number;
}
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

const dummyData = {
  bot1: {
    respuestas: 10,
    correctas: 7,
    errores: 3,
    resultadoFinal: 70,
    confianzaFinal: 80,
    precision: 70,
  },
  bot2: {
    respuestas: 12,
    correctas: 8,
    errores: 4,
    resultadoFinal: 66.67,
    confianzaFinal: 75,
    precision: 66.67,
  },
  bot3: {
    respuestas: 15,
    correctas: 10,
    errores: 5,
    resultadoFinal: 66.67,
    confianzaFinal: 70,
    precision: 66.67,
  },
  player: {
    respuestas: 20,
    correctas: 15,
    errores: 5,
    resultadoFinal: 75,
    confianzaFinal: 85,
    precision: 75,
  },
};

export default function Quiz({ onClose, quizId }: QuizProps) {

  const api = process.env.NEXT_PUBLIC_API_URL;

  const [isClosing, setIsClosing] = useState(false);
  const [optionSelected, setOptionSelected] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);
  const [openBreak, setOpenBreak] = useState(false);
  const [quizData, setQuizData] = useState({} as QuizData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [typeOfBreak, setTypeOfBreak] = useState(0);
  const [stats, setStats] = useState(dummyData);
  const [questionData, setQuestionData] = useState({} as any);
  const [userAnswers, setUserAnswers] = useState<
    Array<{ questionId: number; answer: number; confidence: number }>
  >([]);

  useEffect(() => {
    console.log("api: ", api+`quizes/${quizId}`);

    axios
      .get( api+`quizes/${quizId}`)
      .then((res) => {
        console.log(res);
        setQuizData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        localStorage.setItem("email", "NOT FOUND");
      });
  }, []); // Runs only once after the initial render

  function closeQuiz() {
    if (window.confirm("¿Desea cancelar el quiz?")) {
      setIsClosing(true);
      setTimeout(onClose, 500);
    }
    return;
  }
  async function endQuiz() {
    alert("Quiz finalizado, Felicidades!");
    await postResults();
    setIsClosing(true);
    setTimeout(onClose, 500);
  }

  const selectOption = (option: number) => {
    setOptionSelected(option);
  };
  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };
  async function handleSubmit() {
    console.log("Submitted");
    setQuestionData(quizData?.questions[currentQuestion]);
    await checkAnswer();
    setOpenBreak(true);
    setOptionSelected(0);
    setSliderValue(0);

    // Store the user's answer and confidence level
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionId: quizData.questions[currentQuestion].question_id,
        answer: optionSelected,
        confidence: sliderValue,
      },
    ]);
  }

  useEffect(() => {
    if (optionSelected !== 0 && sliderValue !== 0) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [optionSelected, sliderValue]);

  async function checkAnswer() {
    if (quizData.questions[currentQuestion].correct_answer === optionSelected) {
      await setTypeOfBreak(1);
    } else {
      await setTypeOfBreak(2);
    }
    return;
  }

  const nextQuestion = () => {
    console.log("starting next question");
    if (currentQuestion === quizData.questions.length - 1) {
      //send data
      setOpenBreak(false);
      endQuiz();
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setOpenBreak(false);
    }
  };

  useEffect(() => {
    console.log(currentQuestion);
  }, [currentQuestion]);

  async function postResults() {
    console.log("Posting results");
    const dataToSend = {
      quizId: quizId,
      userId: 1,
      responses: userAnswers,
    };
    axios
      .post("http://localhost:2024/responses/", dataToSend)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="overlay">
      <div className={`quiz ${isClosing ? "closing" : ""}`}>
        <div className="quizHeader">
          <div className="quizTopHeader">
            <h4 className="quizTitle">{quizData.quiz_name}</h4>
            <IoIosClose
              size={60}
              className="closeButton"
              onClick={() => closeQuiz()}
            />
          </div>
          <div className="questionSubHeader">
            <div className="teacherProfile">
              <Image src={profile} alt="profile" className="profileIcon" />
            </div>
            <div className="questionText">
              <h2>{quizData?.questions?.[currentQuestion]?.question} </h2>
            </div>
          </div>
          <div className="playerIcons">
            <div className="userProfileContainer">
              <div className="userProfile">
                <Image src={profile} alt="profile" />
              </div>
            </div>

            <div className="botIconsWrapper">
              <div className="botIconContainer">
                <div className="botIcon">
                  <Image src={profile} alt="profile" />
                </div>
              </div>
              <div className="botIconContainer">
                <div className="botIcon">
                  <Image src={profile} alt="profile" />
                </div>
              </div>
              <div className="botIconContainer">
                <div className="botIcon">
                  <Image src={profile} alt="profile" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="answerContainer">
            <div className="buttonContainer">
              <div
                className={`answerButton ${
                  optionSelected === 1 ? "selected" : ""
                }`}
                onClick={() => {
                  selectOption(1);
                }}
              >
                <h3>{quizData?.questions?.[currentQuestion]?.options[0]}</h3>
              </div>
              <div
                className={`answerButton ${
                  optionSelected === 2 ? "selected" : ""
                }`}
                onClick={() => {
                  selectOption(2);
                }}
              >
                <h3>{quizData?.questions?.[currentQuestion]?.options[1]}</h3>
              </div>
              <div
                className={`answerButton ${
                  optionSelected === 3 ? "selected" : ""
                }`}
                onClick={() => {
                  selectOption(3);
                }}
              >
                <h3>{quizData?.questions?.[currentQuestion]?.options[2]}</h3>
              </div>
              <div
                className={`answerButton ${
                  optionSelected === 4 ? "selected" : ""
                }`}
                onClick={() => {
                  selectOption(4);
                }}
              >
                <h3>{quizData?.questions?.[currentQuestion]?.options[3]}</h3>
              </div>
            </div>
            <div className="selectionContainer">
              <div style={{fontSize: '1.5rem', padding: '1rem'}}>
                <h3>Confianza de respuesta</h3>
              </div>
              <div className="selectWrap">
                <Slider
                  getAriaLabel={() => "Temperature"}
                  orientation="vertical"
                  defaultValue={0}
                  valueLabelDisplay="auto"
                  min={0}
                  max={10}
                  onChangeCommitted={handleSliderChange}
                />
              </div>
              <div className="submitWrap">
                <button
                  className={`submitButton ${canSubmit ? "" : "disabled"}`}
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                >
                  <h3>Enviar</h3>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openBreak && (
        <QuizBreak
          onClose={() => nextQuestion()}
          type={typeOfBreak}
          questionData={questionData}
          stats={stats}
        />
      )}
    </div>
  );
}
