"use-client";
import React from 'react';
import "../../styles/QuizConf/QuizConf.css";
import Image from "next/image"

interface CardProps {
    autor: string;
    nombre: string;
    tema: string;

}


export default function Card({nombre, autor, tema}) {
    const onClick = () => {
        console.log("click");
    };

    return (
        <div className="card">
            <div className="card-content">
                <a>
                    <Image src="/matematicas.jpg" width={250} height={250} className="card-img" alt="foto"/>
                    <p className="card-text">{nombre}</p>
                </a>
            </div>
        </div>
    );
}
