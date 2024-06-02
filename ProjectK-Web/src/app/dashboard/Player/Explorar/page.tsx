"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/Explorar/cardExplorar";
import "@/styles/Explora.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { Backdrop } from "@mui/material";
import QuizExperimental from "@/components/Quiz/QuizExperimental";

export default function Explorar() {
  const api = process.env.NEXT_PUBLIC_API_URL;

  const [query, setQuery] = useState("");
  const [selectedTema, setSelectedTema] = useState("Temas");
  const [realData, setCardData] = useState([]);
  const [quizRunning, setQuizRunning] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [checkEmailLocal, setCheckEmailLocal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const handleChangeTema = (value: string) => {
    setSelectedTema(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };


  useEffect(() => {
    setCheckEmailLocal(true);
    setIsClient(true);

    const fetchQuizes = async () => {
      try {
        console.log("fetching data from: ", api + `quizes`);
        const res = await axios.get(`${api}quizes`);
        setCardData(res.data);
      } catch (err) {
        console.error("Error fetching quizes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizes();
  }, [api]);


  if (!isClient) {
    return null;
  }

  return (
    <div className="main-explora">
      <Backdrop
        open={isLoading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 10 }}
      >
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
            {(realData as { topic_name: string }[]) // Add type annotation
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
                    setQuizRunning(true);
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
      {quizRunning && (
        <QuizExperimental
          onClose={() => setQuizRunning(false)}
          quizId={selectedQuiz}
        />
      )}
    </div>
  );
}
