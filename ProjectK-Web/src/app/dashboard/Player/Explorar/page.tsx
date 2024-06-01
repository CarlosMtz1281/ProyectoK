"use client";

import React, { useState } from "react";
import Card from "@/components/Explorar/cardExplorar";
import "@/styles/Explora.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";
import { hatch } from "ldrs";
import { Backdrop } from "@mui/material";
import QuizExperimental from "@/components/Quiz/QuizExperimental";

export default function Explorar() {
  const api = process.env.NEXT_PUBLIC_API_URL;

  const [query, setQuery] = useState("");
  const [selectedTema, setSelectedTema] = useState("Temas");
  const [realData, setCardData] = useState([]);
  const [quizRuning, setQuizRuning] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleChangeTema = (e: any) => {
    setSelectedTema(e);
  };

  const handleChange = (e: any) => {
    setQuery(e.target.value);
  };

  const [checkEmailLocal, setCheckEmailLocal] = useState(false);

  // Fetch de datos
  useEffect(() => {
    setCheckEmailLocal(true);

    console.log("fetching data from: ", api + `quizes`);
    axios
      .get(api + `quizes`)
      .then((res) => {
        setCardData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  hatch.register();

  return (
    <div className="main-explora">
      <Backdrop
        open={isLoading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 10 }}
      >
        <l-hatch size="52" stroke="10" speed="3.5" color="white"></l-hatch>
      </Backdrop>
      <div className="title-container">
        <p className="title-explora">Explorar</p>
      </div>
      <div className="flex flex-row justify-around pb-8">
        <div className="filter-container">
          <div className="icon-container">
            <FaSearch />
          </div>
          <input
            className="searchBar"
            type="text"
            placeholder={"Buscar por nombre"}
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
      <div className="cards-container">
        {realData.map((card: any, index: number) => {
          if (selectedTema === "Temas" || card.topic_name === selectedTema) {
            if (card.quiz_name.toLowerCase().includes(query.toLowerCase())) {
              return (
                <Card
                  key={index}
                  ID={card.quiz_id}
                  autor={card.author}
                  nombre={card.quiz_name}
                  tema={card.topic_name}
                  openQuiz={() => {
                    setQuizRuning(true);
                    setSelectedQuiz(card.quiz_id);
                  }}
                />
              );
            } else {
              return null;
            }
          } else {
            return null;
          }
        })}
      </div>
      {quizRuning && (
        <QuizExperimental
          onClose={() => setQuizRuning(false)}
          quizId={selectedQuiz}
        />
      )}
    </div>
  );
}
