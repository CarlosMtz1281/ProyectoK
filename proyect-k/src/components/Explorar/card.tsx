"use-client";
import React from "react";
import "../../styles/QuizConf/QuizConf.css";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";


interface CardProps {
  ID: number;
  autor: string;
  nombre: string;
  tema: string;
}

export default function Card({ID, autor, nombre, tema }: CardProps) {
  const appRouter = useRouter();

  const onClick = () => {
    console.log("ID", ID);
    localStorage.setItem("ID", ID.toString());
    appRouter.replace("/quiz");

  };

  return (
    <a>
      <div className="card-content" onClick={onClick}>
        <div className="image-container">
          {tema === "Matematicas" && (
            <Image
              src="/matematicas.jpg"
              width={250}
              height={250}
              className="card-img"
              alt="foto"
            />
          )}
          {tema === "Historia" && (
            <Image
              src="/historia.jpg"
              width={250}
              height={250}
              className="card-img"
              alt="foto"
            />
          )}
          {tema === "Ciencia" && (
            <Image
              src="/ciencia.jpeg"
              width={250}
              height={250}
              className="card-img"
              alt="foto"
            />
          )}
        </div>
        <div className="description-container">
          <p className="card-text">{nombre}</p>
          <p className="card-autor">{tema}</p>
          <p className="card-autor">{autor}</p>
        </div>
      </div>
    </a>
  );
}
