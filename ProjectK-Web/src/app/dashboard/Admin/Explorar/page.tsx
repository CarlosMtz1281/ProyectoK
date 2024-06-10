"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/Explorar/cardExplorar";
import "@/styles/Explora.css";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { hatch } from "ldrs";
import { Backdrop, CircularProgress } from "@mui/material";

export default function Explorar() {
  const [query, setQuery] = useState("");
  const [selectedTema, setSelectedTema] = useState("Temas");
  const [realData, setCardData] = useState([]);
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
    const api = process.env.NEXT_PUBLIC_API_URL;
    setCheckEmailLocal(true);
    axios
      .get(api + `quizes`)
      .then((res) => {
        setCardData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  // Register hatch animation
  useEffect(() => {
    hatch.register();
  }, []);

  return (
    <div className="main-explora">
      <Backdrop
        open={isLoading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 10 }}
      >
        <CircularProgress />
      </Backdrop>
      <div className="title-container">
        <p className="title-explora">Explorar Catalogo</p>
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
      <div className="cards-container">
        {realData.map((card: any, index: number) => {
          if (selectedTema === "Temas" || card.topic_name === selectedTema) {
            if (card.quiz_name?.toLowerCase().includes(query.toLowerCase())) {
              return (
                <Card
                  key={index}
                  ID={card.quiz_id}
                  autor={card.author}
                  nombre={card.quiz_name}
                  tema={card.topic_name}
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
    </div>
  );
}
