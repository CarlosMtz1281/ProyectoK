import React, { useState } from "react";

import { IoMdCheckmark } from "react-icons/io";
import PlayerStats from "./playerStats";

interface QuizBreakProps {
    onClose: () => void;
    }


export default function QuizBreak( {onClose}: QuizBreakProps) {
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
            <h1 className="result">Correcto</h1>
            <div className="checkmark">
              <IoMdCheckmark size={60} />
            </div>
          </div>
          <h3>La pregunta era</h3>
          <h1 className="question">¿Cuál es la derivada de x^2?</h1>
          <h3>La respuesta correcta era</h3>
          <h1 className="question">2x</h1>

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
