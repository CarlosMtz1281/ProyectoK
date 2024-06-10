"use-client";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Slider from "@mui/material/Slider";

import "@/styles/QuizExperimental.css";
import { IoIosClose } from "react-icons/io";
import profile from "@/../public/profileIcon.svg";
import QuizBreak from "./QuizBreak";
import { set } from "firebase/database";
import axios from "axios";
import { getCookie } from "@/app/utils/getcookie";

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
interface stats {

    bot1: {
        respuestas: number;
        correctas: number;
        errores: number;
        resultadoFinal: number;
        confianzaFinal: number;
        preformance: number;
    };
    bot2: {
        respuestas: number;
        correctas: number;
        errores: number;
        resultadoFinal: number;
        confianzaFinal: number;
        preformance: number;
    };
    bot3: {
        respuestas: number;
        correctas: number;
        errores: number;
        resultadoFinal: number;
        confianzaFinal: number;
        preformance: number;
    };
    player: {
        respuestas: number;
        correctas: number;
        errores: number;
        resultadoFinal: number;
        confianzaFinal: number;
        preformance: number;
    };

}

const startingStats = {
    bot1: {
        respuestas: 0,
        correctas: 0,
        errores: 0,
        resultadoFinal: 0,
        confianzaFinal: 8,
        preformance: 0,
    },
    bot2: {
        respuestas: 0,
        correctas: 0,
        errores: 0,
        resultadoFinal: 0,
        confianzaFinal: 8,
        preformance: 0,
    },
    bot3: {
        respuestas: 0,
        correctas: 0,
        errores: 0,
        resultadoFinal: 0,
        confianzaFinal: 8,
        preformance: 0,
    },
    player: {
        respuestas: 0,
        correctas: 0,
        errores: 0,
        resultadoFinal: 0,
        confianzaFinal: 0,
        preformance: 0,
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
  const [stats, setStats] = useState(startingStats as stats);
  const [questionData, setQuestionData] = useState({} as any);
  const [userAnswers, setUserAnswers] = useState<
    Array<{ questionId: number; answer: number; confidence: number }>
  >([]);


  const [isLoaded, setIsLoaded] = useState(false);

  async function fetchData() {
    console.log("api: ", api + `quizes/${quizId}`);
    setIsLoaded(true);
    const userCookiesObj = JSON.parse(await getCookie("userCookies"));
    const sessionKey = userCookiesObj.sessionKey;

    axios
      .get(api + `quizes/quizId/${quizId}`,{ headers: { 'sessionKey': sessionKey }})
      .then((res) => {
        console.log(res);
        setQuizData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
      fetchData();
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

  async function updateStats() {
    // Update the stats of player
    let newStats = stats;
    newStats.player.respuestas += 1;
    if (optionSelected === quizData.questions[currentQuestion].correct_answer) {
      newStats.player.correctas += 1;
    } else {
      newStats.player.errores += 1;
    }
    newStats.player.resultadoFinal =
      (newStats.player.correctas / newStats.player.respuestas) * 100;
    newStats.player.confianzaFinal = (newStats.player.respuestas === 0)
      ? Math.max(sliderValue, 0)
      : ((sliderValue + (newStats.player.respuestas - 1) * newStats.player.confianzaFinal) / stats.player.respuestas);
    newStats.player.confianzaFinal = Math.max(newStats.player.confianzaFinal, 0);
    newStats.player.preformance = (newStats.player.resultadoFinal * newStats.player.confianzaFinal) / 100;
    // Update the stats of bots

    newStats.bot1.respuestas += 1;
    newStats.bot2.respuestas += 1;
    newStats.bot3.respuestas += 1;

    //if user answer is correct give bots 8/10 chance of getting it right else 5/10

    let bot1Correct = false;
    let bot2Correct = false;
    let bot3Correct = false;
    if(quizData.questions[currentQuestion].correct_answer === optionSelected){
      //bots geting good ods
       bot1Correct = Math.random() < 0.8;
       bot2Correct = Math.random() < 0.8;
       bot3Correct = Math.random() < 0.8;
    } else {
      //bots getting bad ods
       bot1Correct = Math.random() < 0.5;
       bot2Correct = Math.random() < 0.5;
       bot3Correct = Math.random() < 0.5;
    }
      if(bot1Correct){
        newStats.bot1.correctas += 1;
      } else {
        newStats.bot1.errores += 1;
      }
      if(bot2Correct){
        newStats.bot2.correctas += 1;
      } else {
        newStats.bot2.errores += 1;
      }
      if(bot3Correct){
        newStats.bot3.correctas += 1;
      } else {
        newStats.bot3.errores += 1;
      }
      newStats.bot1.resultadoFinal = (newStats.bot1.correctas / newStats.bot1.respuestas) * 100;
      newStats.bot1.confianzaFinal = Math.random() < 0.5 ? newStats.bot1.confianzaFinal + 1 : newStats.bot1.confianzaFinal - 1;
      newStats.bot1.confianzaFinal = Math.max(newStats.bot1.confianzaFinal, 0);
      newStats.bot1.preformance = (newStats.bot1.resultadoFinal * newStats.bot1.confianzaFinal) / 100;
      newStats.bot2.resultadoFinal = (newStats.bot2.correctas / newStats.bot2.respuestas) * 100;
      newStats.bot2.confianzaFinal = Math.random() < 0.5 ? newStats.bot2.confianzaFinal + 1 : newStats.bot2.confianzaFinal - 1;
      newStats.bot2.confianzaFinal = Math.max(newStats.bot2.confianzaFinal, 0);
      newStats.bot2.preformance = (newStats.bot2.resultadoFinal * newStats.bot2.confianzaFinal) / 100;
      newStats.bot3.resultadoFinal = (newStats.bot3.correctas / newStats.bot3.respuestas) * 100;
      newStats.bot3.confianzaFinal = Math.random() < 0.5 ? newStats.bot3.confianzaFinal + 1 : newStats.bot3.confianzaFinal - 1;
      newStats.bot3.confianzaFinal = Math.max(newStats.bot3.confianzaFinal, 0);
      newStats.bot3.preformance = (newStats.bot3.resultadoFinal * newStats.bot3.confianzaFinal) / 100;


      await setStats(newStats);
  }

  async function handleSubmit() {
    console.log("Submitted");
    setQuestionData(quizData?.questions[currentQuestion]);
    await checkAnswer();
    await updateStats();
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
    console.log(userAnswers);
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

  const [user_id, setUser_id] = useState(0);

  useEffect(() => {
    async function setUserId() {
      const userCookies = await getCookie("userCookies");
      const userCookiesObj = JSON.parse(userCookies);
      setUser_id(Number(userCookiesObj.user_id));
    }

    console.log(currentQuestion);
    setUserId();
  }, [currentQuestion]);

  async function postResults() {
    const userCookiesObj = JSON.parse(await getCookie("userCookies"));
    const session = userCookiesObj.sessionKey;
    console.log("Posting results");
    const dataToSend = {
      quizId: quizId,
      userId: user_id,
      responses: userAnswers,
    };
    axios
      .post(api + `responses/${session}`, dataToSend)
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
              <div style={{ fontSize: "1.5rem", padding: "1rem" }}>
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
