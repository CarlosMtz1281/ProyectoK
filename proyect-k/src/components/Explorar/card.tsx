"use-client";
import React from 'react';
import "../../styles/QuizConf/QuizConf.css";
import Image from "next/image"

interface CardProps {
    autor: string;
    nombre: string;
    tema: string;

}


export default function Card({autor, nombre, tema}: CardProps) {
    const onClick = () => {
        console.log("click");
    };

    return (
        <a>
            <div className="card-content">
                <div className='image-container'>
                    <Image src="/matematicas.jpg" width={250} height={250} className="card-img" alt="foto" style={{borderRadius: "20px"}}/>
                </div>
                <div className='description-container'>
                    <p className="card-text">{nombre}</p>
                    <p className="card-autor">{autor}</p>
                </div>
            </div>
        </a>
    );
}
