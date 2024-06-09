"use client";

import React, { useState } from "react";
import Card from "@/components/Explorar/cardQuiz";
import "@/styles/MisQuizesAdmin.css";
import { FaSearch } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import Select from "react-select";
import axios from "axios";
import { useEffect } from "react";
import { Fab, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import Link from "next/link";
import { getCookie } from "@/app/utils/getcookie";

interface CardData {
  quiz_id: number;
  admin_id: number;
  topic_id: number;
  quiz_name: string;
  topic_name: string;
  author: string;
}

export default function Explorar() {
  const api = process.env.NEXT_PUBLIC_API_URL;
  const [query, setQuery] = useState("");
  const [selectedTema, setSelectedTema] = useState("Temas");
  const [realData, setCardData] = useState<CardData[]>([]);
  const [quizRuning, setQuizRuning] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const removeQuiz = (ID: number) => {
    console.log("Deleting Quiz", ID);
  };

  const handleChangeTema = (e: any) => {
    setSelectedTema(e);
  };

  const handleChange = (e: any) => {
    setQuery(e.target.value);
  };

  const [adminIDLocal, setAdminIDLocal] = useState(0);
  const [checkEmailLocal, setCheckEmailLocal] = useState(false);

  // We set cookies appropiately
  const fetchCookies = async () => {
    const userCookiesObj = JSON.parse(await getCookie("userCookies"));
    const userid = userCookiesObj.user_id;
    setAdminIDLocal(Number(userid));
    setCheckEmailLocal(true);
  };

  // Fetch de datos

  const fetchdata = async () => {
    await fetchCookies();
    const userCookiesObj = JSON.parse(await getCookie("userCookies"));
    const session = userCookiesObj.sessionKey;
    axios
      .get(api + `quizes/${session}`, { headers: { sessionKey: session } })
      .then((res) => {
        setCardData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);
  /*
    const handleDelete = (id: number) => {
        axios
          .delete(`http://localhost:2024/quizes/${id}`)
          .then(() => {
            setCardData(realData.filter((card) => card.quiz_id !== id));
          })
          .catch((err) => {
            console.error("Error deleting card:", err);
          });
    };
*/
  return (
    <div className="main-explora">
      <div className="title-container">
        <p className="title-explora">Mis Quizes</p>
      </div>
      <div className="flex flex-row justify-between pb-8">
        <div className="filter-container">
          <div className="icon-container">
            <IoIosSearch size={40} />
          </div>
          <input
            className="searchBar"
            type="text"
            placeholder={"Búsqueda por título de quiz ej. Cálculo diferencial"}
            value={query}
            onChange={handleChange}
          />
        </div>
        <div className="temas-button-container">
          <select
            className="temas-button"
            value={selectedTema}
            onChange={(e) => handleChangeTema(e.target.value)}
          >
            <option value={"Temas"}>Temas</option>
            {
              (realData as { topic_name: string }[]) // Add type annotation
                .map((card) => card.topic_name) // Get all topic_names
                .filter((value, index, self) => self.indexOf(value) === index) // Filter out duplicates
                .map((topic, index) => (
                  <option key={index} value={topic}>
                    {topic}
                  </option>
                )) // Map to option elements
            }
          </select>
        </div>
        <div id="crearquiz" className="ml-4">
          <Link href="/dashboard/Admin/MisQuizes/Editor">
            <Tooltip title="Crear quiz" placement="top">
              <Fab color="info">
                <Add />
              </Fab>
            </Tooltip>
          </Link>
        </div>
      </div>
      <div className="cards-container">
        {realData // Add type annotation
          .filter((card) => card.admin_id === adminIDLocal) // Add null check before converting to string
          .map((card: any, index: number) => {
            if (selectedTema === "Temas" || card.topic_name === selectedTema) {
              if (card.quiz_name?.toLowerCase().includes(query.toLowerCase())) {
                return (
                  <Card
                    key={index}
                    reporteId={card.report_Id}
                    ID={card.quiz_id}
                    autor={card.author}
                    nombre={card.quiz_name}
                    tema={card.topic_name}
                    onDelete={() => removeQuiz(card.quiz_id)}
                    openQuiz={() => setQuizRuning(true)}
                    mayDelete={deleting}
                  />
                );
              } else {
                return null; // Don't render the card if it doesn't match the search query
              }
            } else {
              return null; // Don't render the card if it doesn't match the selected tema
            }
          })}
      </div>
      <div className="card-buttons">
        {deleting && (
          <button id="readyButton" onClick={() => setDeleting(false)}>
            Listo
          </button>
        )}

        <button id="deleteButton" onClick={() => setDeleting(true)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}
