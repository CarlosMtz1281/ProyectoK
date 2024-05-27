
import { IoMdCheckmark } from "react-icons/io";

export default function QuizBreak() {
    return (
        <div className="breakContainer slide-up-down">
            <div className="mainHeader">
                <h1 className="result">Correcto</h1>
                <div className="checkmark">
                    <IoMdCheckmark size={60} />
                </div>
            </div>

            <div className="Question">
                <h3>La pregunta era</h3>
                <h1 className="question">¿Cuál es la derivada de x^2?</h1>
                <h3>La respuesta correcta era</h3>
                <h1 className="question">2x</h1>

            </div>

            <div className="davabot">

            </div>

            <div className="stats">

            </div>

        </div>
    );
}