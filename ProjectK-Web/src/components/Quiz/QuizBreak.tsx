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
    <div className={`breakContainer ${isClosing ? "closing" : ""} type-${type}`}>
      <div className="mainBody">
        <div className="statsBots">
          <PlayerStats
            type={1}
            respuestas={stats.bot1.respuestas}
            correctas={stats.bot1.correctas}
            errores={stats.bot1.errores}
            resultadoFinal={stats.bot1.resultadoFinal}
            confianzaFinal={stats.bot1.confianzaFinal}
            precision={stats.bot1.preformance}
          />
          <PlayerStats
            type={1}
            respuestas={stats.bot2.respuestas}
            correctas={stats.bot2.correctas}
            errores={stats.bot2.errores}
            resultadoFinal={stats.bot2.resultadoFinal}
            confianzaFinal={stats.bot2.confianzaFinal}
            precision={stats.bot2.preformance}
          />
          <PlayerStats
            type={1}
            respuestas={stats.bot3.respuestas}
            correctas={stats.bot3.correctas}
            errores={stats.bot3.errores}
            resultadoFinal={stats.bot3.resultadoFinal}
            confianzaFinal={stats.bot3.confianzaFinal}
            precision={stats.bot3.preformance}
          />
        </div>

        <div className="questionContainer">
          <div className="mainHeader">
            <h1 className="result">{type === 1 ? 'Correcto' : type === 2 ? 'Incorrecto' : ''}</h1>
            <div className="icon">
              {type === 1 && <IoMdCheckmark className="checkmark" size={120} />}
              {type === 2 && <IoIosClose className="cross" size={120} />}
            </div>
          </div>
          <p>La pregunta era</p>
          <h1 className="question">{questionData.question}</h1>
          <p>La respuesta correcta era</p>
          <h1 className="question-resp">{questionData.options[questionData.correct_answer-1] }</h1>

        <div className="nextQuestionWrap">
            <div className={`nextQuestionBtn type-${type}`} onClick={startClosing}>Siguiente </div>
            </div>

        </div>

        <div className="statsPlayer">
          <PlayerStats
            type={2}
            respuestas={stats.player.respuestas}
            correctas={stats.player.correctas}
            errores={stats.player.errores}
            resultadoFinal={stats.player.resultadoFinal}
            confianzaFinal={stats.player.confianzaFinal}
            precision={stats.player.preformance}
          />
        </div>
      </div>
    </div>
  );
}
