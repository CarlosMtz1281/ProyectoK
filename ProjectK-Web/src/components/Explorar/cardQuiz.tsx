"use-client";
import React, { useState, useEffect } from "react";
import "../../styles/QuizConf/QuizConf.css";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { set } from "firebase/database";
import { SetCookieAPI } from "@/app/utils/setcookie";
import { getCookie } from "@/app/utils/getcookie";

interface CardProps {
  ID: number;
  reporteId: string;
  autor: string;
  nombre: string;
  tema: string;
  fecha?: string;
  openQuiz?: () => void;
  onDelete?: () => void;
  mayDelete?: boolean;
}

export default function Card({
  ID,
  autor,
  nombre,
  tema,
  fecha,
  reporteId,
  openQuiz,
  onDelete,
  mayDelete = false,
}: CardProps) {
  const appRouter = useRouter();
  const pathName = usePathname();
  const [isAdmin, setIsAdmin] = useState<string>("false");
  const [checkIDLocal, setCheckIDLocal] = useState(false);
  const [checkReportLocal, setCheckReportLocal] = useState(false);

  useEffect(() => {
    async function setAdmin(name: string) {
      setIsAdmin((await getCookie(name)) || "");
    }
    setAdmin("admin");
    setCheckIDLocal(true);
    setCheckReportLocal(true);
  }, []);

  function handleDelete() {
    console.log(ID);
    if (onDelete) {
      onDelete();
    }
  }

  const onClick = async () => {
    if (mayDelete === false) {
      console.log("ID", ID);
      if (checkIDLocal) {
        await SetCookieAPI("ID", ID.toString());
      }
      if (isAdmin === "false") {
        appRouter.replace("/dashboard/Player/MisQuizes/Reporte");
      } else if (isAdmin === "true") {
        appRouter.replace("/dashboard/Admin/MisQuizes/Reporte");
      }

      if (checkReportLocal) {
        await SetCookieAPI("reporte_Id", reporteId);
      }
    }
  };

  let formattedDate = "";
  if (fecha) {
    const date = new Date(fecha);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    formattedDate = `${formattedHours}:${formattedMinutes} ${amOrPm}, ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  }

  return (
    <a>
      <div className="card-content" onClick={onClick}>
        <div className="image-container">
          {mayDelete && (
            <div className="onDelete" onClick={handleDelete}>
              <MdDelete size={30} />
            </div>
          )}

          {tema === "Matematicas" && (
            <Image
              src="/matematicas.jpg"
              className="card-img"
              alt="foto"
              fill
            />
          )}
          {tema === "Historia" && (
            <Image src="/historia.jpg" className="card-img" alt="foto" fill />
          )}
          {tema === "Ciencia" && (
            <Image src="/ciencia.jpeg" className="card-img" alt="foto" fill />
          )}
        </div>
        <div className="description-container">
          <p className="card-text">{nombre}</p>
          <p className="card-autor2">{autor}</p>
          <p className="card-autor2">{formattedDate}</p>

          <div className="autor-container">
            <p className="card-autor">{tema}</p>
          </div>
        </div>
      </div>
    </a>
  );
}
