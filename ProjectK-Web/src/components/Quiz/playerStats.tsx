import React from 'react';
import Image from 'next/image';

import profile from "@/../public/profileIcon.svg";

interface PlayerStatsProps {
    type: number;
    respuestas: number;
    correctas: number;
    errores: number;
    resultadoFinal: number;
    confianzaFinal: number;
    precision: number;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ type, respuestas, correctas, errores, resultadoFinal, confianzaFinal, precision }) => {
    if (type === 1) {
        return (
            <div className="playerStats">
                <div className="profileImgContainer">
                    <Image src={profile} alt="Profile" className="profileImg" />
                </div>
                <div className="stats">
                    <p>Respuestas: {Math.round(respuestas)}</p>
                    <p>Correctas: {Math.round(correctas)}</p>
                    <p>Errores: {Math.round(errores)}</p>
                    <p>Resultado Final: {Math.round(resultadoFinal)}</p>
                    <p>Confianza Final: {Math.round(confianzaFinal)}</p>
                    <p>Desempeño: {Math.round(precision)}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="playerStats">

                <div className="stats">
                    <p>Respuestas: {Math.round(respuestas)}</p>
                    <p>Correctas: {Math.round(correctas)}</p>
                    <p>Errores: {Math.round(errores)}</p>
                    <p>Resultado Final: {Math.round(resultadoFinal)}</p>
                    <p>Confianza Final: {Math.round(confianzaFinal)}</p>
                    <p>Desempeño: {Math.round(precision)}</p>
                </div>
                <div className="profileImgContainer2">
                    <Image src={profile} alt="Profile" className="profileImg" />
                </div>
            </div>
        );
    }
}
export default PlayerStats;