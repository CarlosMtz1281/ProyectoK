"use-client";
import React, { useState, useEffect } from "react";
import "../../styles/QuizConf/QuizConf.css";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { set } from "firebase/database";
import { SetCookieAPI } from "@/app/utils/setcookie";
import { getCookie } from "@/app/utils/getcookie";
import Link from "next/link";

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkIDLocal, setCheckIDLocal] = useState(false);
  const [checkReportLocal, setCheckReportLocal] = useState(false);

  async function setAdmin() {
    const userCookiesObj = JSON.parse(await getCookie("userCookies"));
    const adminname = userCookiesObj.admin;
    setIsAdmin(adminname);
    setCheckIDLocal(true);
    setCheckReportLocal(true);
  }

  // we fix some async issues

  useEffect(() => {
    setAdmin();
  }, []);

  function handleDelete() {
    if (onDelete) {
      onDelete();
    }
  }

  const onClick = async () => {
    if (mayDelete === false) {
      if (checkIDLocal) {
        await SetCookieAPI("ID", ID.toString());
      }
      if (checkReportLocal && !isAdmin) {
        console.log("this should be reporteid", reporteId);
        await SetCookieAPI("reporte_Id", reporteId);
      }
    }
  };

  let formattedDate = "";
  if (fecha) {
    const date = new Date(fecha);
    date.setHours(date.getHours() - 6);
    date.setDate(date.getDate());
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
      <Link
        href={`${
          !isAdmin
            ? "/dashboard/Player/MisQuizes/Reporte"
            : `/dashboard/Admin/MisQuizes/Reporte/${ID}`
        }`}
        className="card-content"
        onClick={onClick}
      >
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

          {tema !== "Matematicas" &&
            tema !== "Ciencia" &&
            tema !== "Historia" && (
              <Image
                src="/matematicas.jpg"
                className="card-img"
                alt="foto"
                fill
              />
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
      </Link>
    </a>
  );
}
