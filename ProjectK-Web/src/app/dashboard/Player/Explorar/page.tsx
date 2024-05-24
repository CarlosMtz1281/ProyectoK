'use client'

import React, { useState } from 'react';
import Card from "@/components/Explorar/cardExplorar"
import '@/styles/Explora.css'
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { useEffect } from 'react';

import QuizExperimental from '@/components/Quiz/QuizExperimental';




export default function Explorar() {

    const [query, setQuery] = useState('')
    const [selectedTema, setSelectedTema] = useState('Temas');
    const [realData, setCardData] = useState([])

    const [quizRuning, setQuizRuning] = useState(true);


    const handleChangeTema = (e : any) => {
        setSelectedTema(e)
    }

    const handleChange = (e : any) => {
        setQuery(e.target.value)
    }

    // Fetch de datos
    useEffect(() => {
        axios
          .get(`http://localhost:2024/quizes`)
          .then((res) => {
            console.log(res);
            setCardData(res.data);
            console.log(res.data);


          })
          .catch((err) => {
            console.log(err);
            localStorage.setItem('email', 'NOT FOUND');


          });

      },
        []
        );



    return (
        <div className="main-explora">
            <div className='title-container'>
                <p className='title-explora'>
                    Explorar
                </p>
            </div>
            <div className='flex flex-row justify-around pb-8'>
                <div className='filter-container'>
                    <div className='icon-container'>
                        <FaSearch />
                    </div>
                    <input className='searchBar' type='text' placeholder={'Buscar por nombre'} value={query} onChange={handleChange}/>
                </div>
                <div className='temas-button-container'>
                    <select className="temas-button" value={selectedTema} onChange={(e) => handleChangeTema(e.target.value)}>
                        <option value={"Temas"}>Temas</option>
                        {
                            (realData as { topic_name: string }[]) // Add type annotation
                                .map(card => card.topic_name) // Get all topic_names
                                .filter((value, index, self) => self.indexOf(value) === index) // Filter out duplicates
                                .map((topic, index) => <option key={index} value={topic}>{topic}</option>) // Map to option elements
                        }
                    </select>
                </div>
            </div>
            <div className='cards-container'>
            {realData.map((card: any, index: number) => {
                if (selectedTema === 'Temas' || card.topic_name === selectedTema) {
                    if (card.quiz_name.toLowerCase().includes(query.toLowerCase())) {
                        return <Card key={index} ID={card.quiz_id} autor={card.author} nombre={card.quiz_name} tema={card.topic_name} openQuiz={() => setQuizRuning(true)}/>;
                    } else {
                        return null; // Don't render the card if it doesn't match the search query
                    }
                } else {
                    return null; // Don't render the card if it doesn't match the selected tema
                }
            })}
            </div>
            {quizRuning && <QuizExperimental onClose={() => setQuizRuning(false)}/>}
        </div>
    );
}

