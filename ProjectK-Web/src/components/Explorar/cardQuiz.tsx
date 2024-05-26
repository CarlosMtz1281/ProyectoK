"use-client";
import React, { useState } from "react";
import "../../styles/QuizConf/QuizConf.css";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { MdDelete } from "react-icons/md";


interface CardProps {
  ID: number;
  autor: string;
  nombre: string;
  tema: string;
  openQuiz?: () => void
  onDelete?: () => void;
  mayDelete?: boolean;
}

export default function Card({ID, autor, nombre, tema, openQuiz, onDelete, mayDelete = false}: CardProps) {
  const appRouter = useRouter();
  const pathName = usePathname();


  function handleDelete (){
    console.log(ID);
    if(onDelete){
      onDelete();
    }
  }

  const onClick = () => {
    if(mayDelete === false){
      console.log("ID", ID);
      localStorage.setItem("ID", ID.toString());
      appRouter.replace("/dashboard/Player/MisQuizes/Reporte");
    }
  };

  return (
    <a>
      <div className="card-content" onClick={onClick}>

        <div className="image-container">
          {mayDelete && <div  className="onDelete" onClick={handleDelete}><MdDelete size={30} /></div>}


          {tema === "Matematicas" && (
            <Image
              src="/matematicas.jpg"
              className="card-img"
              alt="foto"
              fill
            />
          )}
          {tema === "Historia" && (
            <Image
              src="/historia.jpg"
              className="card-img"
              alt="foto"
              fill
            />
          )}
          {tema === "Ciencia" && (
            <Image
              src="/ciencia.jpeg"
              className="card-img"
              alt="foto"
              fill
            />
          )}
        </div>
        <div className="description-container">
          <p className="card-text">{nombre}</p>
          <p className="card-autor">{tema}</p>


          <div className="autor-container">
            <p className="card-autor">{autor}</p>
          </div>
        </div>
      </div>
    </a>

  );
}
