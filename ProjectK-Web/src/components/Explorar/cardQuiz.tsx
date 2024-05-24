"use-client";
import React, { useState } from "react";
import "../../styles/QuizConf/QuizConf.css";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import GameModal from "./gameModal";
import { MdDelete } from "react-icons/md";


interface CardProps {
  ID: number;
  autor: string;
  nombre: string;
  tema: string;
  openQuiz: () => void
  onDelete: () => void;
}

export default function Card({ID, autor, nombre, tema, openQuiz, onDelete}: CardProps) {
  const appRouter = useRouter();
  const pathName = usePathname();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function handleDelete (){
    console.log(ID);
    onDelete();
  }

  const onClick = () => {
    console.log("ID", ID);
    localStorage.setItem("ID", ID.toString());
    //appRouter.replace("/quiz");
    if(pathName === "/dashboard/Player/Explorar" || pathName === "/dashboard/Admin/Explorar"){
      handleOpen();
    }
  };

  return (
    <a>
      <div className="card-content" onClick={onClick}>
        <div className="image-container">
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
          <button  className="onDelete" onClick={handleDelete}><MdDelete /></button>
          <div className="autor-container">
            <p className="card-autor">{autor}</p>
          </div>
        </div>
      </div>
      {open && <GameModal open={open} handleClose={handleClose} confirm={()=> openQuiz()} />}
    </a>

  );
}
