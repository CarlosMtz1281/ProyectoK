import React, {useState} from "react";

import "@/styles/QuizExperimental.css";
import { IoIosClose } from "react-icons/io";


interface QuizProps {
  // Define the props for your component here
  onClose: () => void;
}

export default function Quiz({ onClose }: QuizProps) {
    const [isClosing, setIsClosing] = useState(false);

  // Add your component logic here
  const closeQuiz = () => {
    setIsClosing(true);
    setTimeout(onClose, 1000); // Adjust this to match the duration of your animation
}

  return (
    <div className={`quiz ${isClosing ? 'closing' : ''}`}>

        <div className="quizHeader">
            <div className="quizTopHeader">
                <h4 className="quizTitle">Calculo diferencial II</h4>
                <IoIosClose size={60} className="closeButton" onClick={closeQuiz}/>

            </div>
            <div className="questionSubHeader">
                <div className="teacherProfile">

                </div>
                <div className="questionText">
                    <h2>1. ¿Que representa el area bajo la curva en una curva de velocidad contra tiempo?</h2>
                </div>
            </div>
        </div>
    </div>
  );
};

