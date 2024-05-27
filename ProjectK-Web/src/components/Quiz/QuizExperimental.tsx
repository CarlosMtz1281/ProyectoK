import React, { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "@mui/material/Slider";

import "@/styles/QuizExperimental.css";
import { IoIosClose } from "react-icons/io";
import profile from "@/../public/profileIcon.svg";
import QuizBreak from "./QuizBreak";
import { set } from "firebase/database";

interface QuizProps {
  // Define the props for your component here
  onClose: () => void;
}

export default function Quiz({ onClose }: QuizProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [optionSelected, setOptionSelected] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);
  const [openBreak, setOpenBreak] = useState(false);

  function valuetext(value: number) {
    return { value };
  }
  // Add your component logic here
  const closeQuiz = () => {
    setIsClosing(true);
    setTimeout(onClose, 500);
  };

  const selectOption = (option: number) => {
    setOptionSelected(option);
  };
  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };
  const handleSubmit = () => {
    console.log("Submitted");
    setOpenBreak(true);
    setOptionSelected(0);
    setSliderValue(0);

  };

  useEffect(() => {
    if (optionSelected !== 0 && sliderValue !== 0) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [optionSelected, sliderValue]);

  return (
    <div className="overlay">
      <div className={`quiz ${isClosing ? "closing" : ""}`}>
        <div className="quizHeader">
          <div className="quizTopHeader">
            <h4 className="quizTitle">Calculo diferencial II</h4>
            <IoIosClose size={60} className="closeButton" onClick={closeQuiz} />
          </div>
          <div className="questionSubHeader">
            <div className="teacherProfile">
              <Image src={profile} alt="profile" className="profileIcon" />
            </div>
            <div className="questionText">
              <h2>
                1. ¿Que representa el area bajo la curva en una curva de
                velocidad contra tiempo?
              </h2>
            </div>
          </div>
          <div className="playerIcons">
            <div className="userProfileContainer">
              <div className="userProfile">
                <Image src={profile} alt="profile" />
              </div>
            </div>

            <div className="botIconsWrapper">
              <div className="botIcon">
                <Image src={profile} alt="profile" />
              </div>
              <div className="botIcon">
                <Image src={profile} alt="profile" />
              </div>
              <div className="botIcon">
                <Image src={profile} alt="profile" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="answerContainer">
            <div className="buttonContainer">
              <div className={`answerButton ${optionSelected === 1 ? 'selected' : ''}`} onClick={() => {selectOption(1)}}>
                  <h3>Respuesta 1</h3>
              </div>
              <div className={`answerButton ${optionSelected === 2 ? 'selected' : ''}`} onClick={() => {selectOption(2)}}>
                  <h3>Respuesta 2</h3>
              </div>
              <div className={`answerButton ${optionSelected === 3 ? 'selected' : ''}`} onClick={() => {selectOption(3)}}>
                  <h3>Respuesta 3</h3>
              </div>
              <div className={`answerButton ${optionSelected === 4 ? 'selected' : ''}`} onClick={() => {selectOption(4)}}>
                  <h3>Respuesta 4</h3>
              </div>
            </div>
            <div className="selectionContainer">
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
                  onClick={canSubmit ? handleSubmit : undefined}
                  disabled={!canSubmit}
                >
                  <h3>Enviar</h3>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openBreak && <QuizBreak onClose={()=> setOpenBreak(false)} />}
    </div>
  );
}
