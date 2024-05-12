'use client'

import React, { useState } from 'react';
import Card from '../../../components/Explorar/card'
import '../../../styles/Explora.css'
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { useEffect } from 'react';

const cardData = [
    { autor: 'Author 1', nombre: 'Matematicas', tema: 'Topic 1' },
    { autor: 'Author 2', nombre: 'Español', tema: 'Topic 2' },
    { autor: 'Author 3', nombre: 'Historia', tema: 'Topic 3' },
    { autor: 'Author 4', nombre: 'Tecnologias', tema: 'Topic 4' },
    { autor: 'Author 5', nombre: 'Arte', tema: 'Topic 5' },
    { autor: 'Author 6', nombre: 'Programación', tema: 'Topic 6' },
    { autor: 'Author 7', nombre: 'Metodos Computacionales', tema: 'Topic 7' },
    { autor: 'Author 8', nombre: 'Geografia', tema: 'Topic 8' },
    { autor: 'Author 9', nombre: 'Fortaleciendo cuerpo, espiritu, sexualidad, mente', tema: 'Topic 9' },
    { autor: 'Author 1', nombre: 'Ingles', tema: 'Topic 10' },
    { autor: 'Author 2', nombre: 'Civica y Etica', tema: 'Topic 11' },
    { autor: 'Author 3', nombre: 'Frances', tema: 'Topic 12' },
    { autor: 'Author 4', nombre: 'Trigonometria', tema: 'Topic 13' },
    { autor: 'Author 5', nombre: 'Aleman', tema: 'Topic 14' },
    { autor: 'Author 1', nombre: 'La la la la', tema: 'Topic 15' },
    { autor: 'Author 2', nombre: 'Esports', tema: 'Topic 16' },
    { autor: 'Author 3', nombre: 'Semana 18', tema: 'Topic 17' },
    { autor: 'Author 4', nombre: 'No se', tema: 'Topic 18' },
    { autor: 'Author 5', nombre: 'Pedro', tema: 'Topic 19' },
    // Add more objects as needed
  ];



export default function Explorar() {

    const [query, setQuery] = useState('')
    const [selectedTema, setSelectedTema] = useState('Temas');
    const [realData, setCardData] = useState([])

    const handleChangeTema = (e : any) => {
        setSelectedTema(e)
        setQuery('')
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
                        return <Card key={index} ID={card.quiz_id} autor={card.author} nombre={card.quiz_name} tema={card.topic_name} />;
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

