import React, { useState } from "react";

import { IoMdCheckmark } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import PlayerStats from "./playerStats";
import Image from "next/image";

interface QuizBreakProps {
    type: number;
    onClose: () => void;
    stats:{
        bot1: {
            respuestas: number;
            correctas: number;
            errores: number;
            resultadoFinal: number;
            confianzaFinal: number;
            precision: number;
        };
        bot2: {
            respuestas: number;
            correctas: number;
            errores: number;
            resultadoFinal: number;
            confianzaFinal: number;
            precision: number;
        };
        bot3: {
            respuestas: number;
            correctas: number;
            errores: number;
            resultadoFinal: number;
            confianzaFinal: number;
            precision: number;
        };
        player: {
            respuestas: number;
            correctas: number;
            errores: number;
            resultadoFinal: number;
            confianzaFinal: number;
            precision: number;
        };

    }
    questionData: {
        question: string;
        correct_answer: number;
        options: string[];
    }
}


export default function QuizBreak( {onClose, type, stats, questionData}: QuizBreakProps) {
    const [isClosing, setIsClosing] = useState(false);

    const startClosing = () => {
        setIsClosing(true);
        setTimeout(onClose, 500);
    }

  return (
    <div className= {`breakContainer ${isClosing ? "closing" : ""} type-${type}`}>
      <div className="mainBody">
        <div className="statsBots">
          <PlayerStats
            type={1}
            respuestas={10}
            correctas={10}
            errores={0}
            resultadoFinal={100}
            confianzaFinal={100}
            precision={100}
          />
          <PlayerStats
            type={1}
            respuestas={10}
            correctas={10}
            errores={0}
            resultadoFinal={100}
            confianzaFinal={100}
            precision={100}
          />
          <PlayerStats
            type={1}
            respuestas={10}
            correctas={10}
            errores={0}
            resultadoFinal={100}
            confianzaFinal={100}
            precision={100}
          />
        </div>

        <div className="questionContainer">
          <div className="mainHeader">
            <h1 className="result">{type === 1 ? 'Correcto' : type === 2 ? 'Incorrecto' : ''}</h1>
            <div className="icon">
              {type === 1 && <IoMdCheckmark className="checkmark" size={60} />}
              {type === 2 && <IoIosClose className="cross" size={60} />}
            </div>
          </div>
          <div className = "flex flex-row gap-7">
            <div>
          <p>Pregunta:</p>
          <h1 className="question">{questionData.question}</h1>
          </div>
          <div>
          <p>Respuesta:</p>
          <h1 className="question-resp">{questionData.options[questionData.correct_answer-1] }</h1>
          </div>
          </div>
          <iframe src=  {type === 1 ? "https://giphy.com/embed/13CoXDiaCcCoyk": "https://giphy.com/embed/YSBLqMGIUoAgHxihVw/video"} width="400" height="300" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/wiggle-shaq-13CoXDiaCcCoyk">via GIPHY</a></p>

        <div className="nextQuestionWrap">
            <div className={`nextQuestionBtn type-${type}`} onClick={startClosing}>Siguiente </div>
            </div>

        </div>

        <div className="statsPlayer">
          <PlayerStats
            type={2}
            respuestas={10}
            correctas={10}
            errores={0}
            resultadoFinal={100}
            confianzaFinal={100}
            precision={100}
          />
        </div>
      </div>
    </div>
  );
}
