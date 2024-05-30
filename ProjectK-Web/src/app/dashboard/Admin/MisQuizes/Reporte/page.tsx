'use client'

import React, { useState, useEffect } from 'react';
import "@/styles/ReporteAdmin.css";
import { IoIosArrowBack } from "react-icons/io";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import QuestionStats from "@/components/QuestionStats";
import { useRouter } from 'next/navigation';
import ReportAdminModal from "@/components/ReportAdminModal";

const dummyStudents = [
    {
        name: 'Juan Perez',
        id: 1
    },
    {
        name: 'Maria Lopez',
        id: 2
    },
    {
        name: 'Pedro Ramirez',
        id: 3
    }
]

const dummyBarData = {
    labels: [''],
    datasets: [
        {
            label: 'Pregunta 1',
            data: [37],
            backgroundColor: 'rgba(255, 99, 132)',
        },
        {
            label: 'Pregunta 2',
            data: [20],
            backgroundColor: 'rgba(54, 162, 235)',
        },
        {
            label: 'Pregunta 3',
            data: [25],
            backgroundColor: 'rgba(255, 206, 86)',
        },
        {
            label: 'Pregunta 4',
            data: [18],
            backgroundColor: 'rgba(75, 192, 192)',
        },
    ]
}

const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export default function ReporteAdmin() {
    const appRouter = useRouter();
    const [query, setQuery] = useState('')

    const handleSearch = (e : any) => {
        setQuery(e.target.value)
    }

    const handleButtonBack = () => {
        appRouter.replace("/dashboard/Admin/MisQuizes");
    }

    const handleButtonEdit = () => {
        //appRouter.replace("/dashboard/Admin/MisQuizes/Editar");
    }


    return (
        <div className='mainContainer'>
            <div className='header'>
                <div className='headerContainer'>
                    <button className='returnButton' onClick={handleButtonBack}> <IoIosArrowBack size={40}/> </button>
                    <h1 className='headerText'>Reporte</h1>
                </div>
                <div className='flex items-center justify-center w-1/5'>
                    <button className='editButton' onClick={handleButtonEdit}>
                        <div className='flex flex-row items-center justify-center gap-4 -ml-5'>
                            <BiSolidEditAlt size={30}/>
                            <p>Editar</p>
                        </div>
                    </button>
                </div>
            </div>
            <div className='content'>
                <div className='flex flex-col justify-center items-center w-4/5'>
                    <div className='generalStatsContainer'>
                        <div className='statContainer1'>
                            <div className='flex flex-row justify-center items-baseline'>
                                <p className='statNumber'>97</p>
                                <p className='statPercent'>%</p>
                            </div>
                            <div className='flex justify-center items-center -mt-2 text-center'>
                                <p className='statDescription'>Precision Promedia</p>
                            </div>
                        </div>

                        <div className='statContainer2'>
                            <div className='flex flex-row justify-center items-baseline'>
                                <p className='statNumber'>89</p>
                                <p className='statPercent'>%</p>
                            </div>
                            <div className='flex justify-center items-center -mt-2 text-center'>
                                <p className='statDescription'>Confianza Promedio</p>
                            </div>
                        </div>

                        <div className='statContainer3'>
                            <div className='flex flex-row justify-center items-baseline'>
                                <p className='statNumber'>64</p>
                                <p className='statPercent'>%</p>
                            </div>
                            <div className='flex justify-center items-center -mt-2 text-center'>
                                <p className='statDescription'>Desempeño Promedio</p>
                            </div>
                        </div>
                    </div>

                    <div className='questionsAccordionContainer'>
                        <QuestionStats data={dummyBarData} contentAI={defaultContent} precisionV={97} confidenceV={89}/>
                    </div>
                </div>
                <div className='filterContainer'>
                    <div className='studentSearch'>
                        <div className='iconSearch'>
                            <IoIosSearch size={30}/>
                        </div>
                        <input
                            className='searchBarStudent'
                            type='text'
                            placeholder={'Buscar alumno'}
                            value={query}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className='studentList'>
                        {dummyStudents.map((student) => {
                            if (student.name?.toLowerCase().includes(query.toLowerCase())) {
                                return (
                                    <div className='studentCard'>
                                        <p className='studentName'>{student.name}</p>
                                        <ReportAdminModal name={student.name} contentAI={defaultContent}/>
                                    </div>
                                );
                            } else {
                                return null; // Don't render the card if it doesn't match the search query
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
