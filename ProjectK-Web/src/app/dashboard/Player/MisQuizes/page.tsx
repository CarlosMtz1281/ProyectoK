"use client";

import React, { useState } from "react";
import Card from "@/components/Explorar/cardQuiz";
import "@/styles/MisQuizesPlayer.css";
import { FaSearch } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import Select from "react-select";
import axios from "axios";
import { useEffect } from "react";
import { getCookie } from "@/app/utils/getcookie";

export default function Explorar() {
  const api = process.env.NEXT_PUBLIC_API_URL;

  const [query, setQuery] = useState("");
  const [selectedTema, setSelectedTema] = useState("Temas");
  const [realData, setCardData] = useState([]);
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

  // We set cookies
  const fetchCookies = async () => {
    const userCookiesObj = JSON.parse(await getCookie("userCookies"));
    const userid = userCookiesObj.user_id;
    const sessionKey = userCookiesObj.sessionKey;
  axios
    .get(api + `responses/user/${Number(userid)}`, { headers: { 'sessionKey': sessionKey } })
    .then((res) => {
      setCardData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

  // Fetch the data
  useEffect(() => {
    fetchCookies();
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
            placeholder={"Busqueda por titulo de quiz ej. Calculo diferencial"}
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
      </div>
      {realData.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <div className="no-quizzes-message">
            No se ha completado ningún quiz, complete uno y vea aquí su
            evaluación.
          </div>
        </div>
      ) : (
        <div className="cards-container">
          {realData.map((card: any, index: number) => {
            if (selectedTema === "Temas" || card.topic_name === selectedTema) {
              if (card.quiz_name?.toLowerCase().includes(query.toLowerCase())) {
                return (
                  <Card
                    key={index}
                    ID={card.quiz_id}
                    reporteId={card.report_id}
                    autor={card.author_name}
                    nombre={card.quiz_name}
                    tema={card.topic_name}
                    fecha={card.created_at}
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
      )}
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
