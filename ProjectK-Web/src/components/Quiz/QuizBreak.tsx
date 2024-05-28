import React, { useState } from "react";

import { IoMdCheckmark } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import PlayerStats from "./playerStats";

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
    <div className= {`breakContainer ${isClosing ? "closing" : ""}`}>
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
          <h3>La pregunta era</h3>
          <h1 className="question">{questionData.question}</h1>
          <h3>La respuesta correcta era</h3>
          <h1 className="question">{questionData.options[questionData.correct_answer-1] }</h1>

        <div className="nextQuestionWrap">
            <div className="nextQuestionBtn" onClick={startClosing}>Siguiente </div>
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
