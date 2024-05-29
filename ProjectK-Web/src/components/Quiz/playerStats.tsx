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
                    <p>Respuestas: {respuestas}</p>
                    <p>Correctas: {correctas}</p>
                    <p>Errores: {errores}</p>
                    <p>Resultado Final: {resultadoFinal}</p>
                    <p>Confianza Final: {confianzaFinal}</p>
                    <p>Precisión: {precision}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="playerStats">

                <div className="stats">
                    <p>Respuestas: {respuestas}</p>
                    <p>Correctas: {correctas}</p>
                    <p>Errores: {errores}</p>
                    <p>Resultado Final: {resultadoFinal}</p>
                    <p>Confianza Final: {confianzaFinal}</p>
                    <p>Precisión: {precision}</p>
                </div>
                <div className="profileImgContainer2">
                    <Image src={profile} alt="Profile" className="profileImg" />
                </div>
            </div>
        );
    }
}
export default PlayerStats;