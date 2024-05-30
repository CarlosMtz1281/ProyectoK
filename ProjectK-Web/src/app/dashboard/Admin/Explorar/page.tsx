'use client'

import React, { useState } from 'react';
import Card from "@/components/Explorar/cardExplorar"
import '@/styles/Explora.css'
import { FaSearch } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import Select from 'react-select';
import axios from 'axios';
import { useEffect } from 'react';

export default function Explorar() {
    const api = process.env.NEXT_PUBLIC_API_URL ;

    const [query, setQuery] = useState('')
    const [selectedTema, setSelectedTema] = useState('Temas');
    const [realData, setCardData] = useState([])

    const handleChangeTema = (e : any) => {
        setSelectedTema(e)
    }

    const handleChange = (e : any) => {
        setQuery(e.target.value)
    }

    const [checkEmailLocal, setCheckEmailLocal] = useState(false);

    // Fetch de datos
    useEffect(() => {
        setCheckEmailLocal(true);

        axios
          .get(api+`quizes`)
          .then((res) => {
            console.log(res);
            setCardData(res.data);
            console.log(res.data);


          })
          .catch((err) => {
            console.log(err);
            if(checkEmailLocal){
                localStorage.setItem('email', 'NOT FOUND');
            }


          });

      },
        []
        );


    return (
        <div className="main-explora">
            <div className='title-container'>
                <p className='title-explora'>
                    Explorar Catalogo
                </p>
            </div>
            <div className='flex flex-row justify-between pb-8'>
                <div className='filter-container'>
                    <div className='icon-container'>
                        <IoIosSearch size={40}/>
                    </div>
                    <input className='searchBar'
                        type='text'
                        placeholder={'Busqueda por titulo de quiz ej. Calculo diferencial'}
                        value={query}
                        onChange={handleChange}/>
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
                    if (card.quiz_name?.toLowerCase().includes(query.toLowerCase())) {
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

