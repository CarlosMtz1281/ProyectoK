'use client'

import React, { useState, useEffect } from 'react';
import "@/styles/ReporteAdmin.css";
import { IoIosArrowBack } from "react-icons/io";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import QuestionStats from "@/components/QuestionStats";
import { useRouter } from 'next/navigation';
import ReportAdminModal from "@/components/ReportAdminModal";
import Link from 'next/link';
import { getCookie } from '@/app/api/cookies/cookie';
import axios from 'axios';

interface quizReport {
    QuizData: any,
    QuizSubmissions: any,
}

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


const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export default function ReporteAdmin({params} : {params: {id: string}}) {
    const appRouter = useRouter();
    const [query, setQuery] = useState('');
    const [quizReport, setQuizReport] = useState<quizReport | undefined>(undefined);
    const [isFetching, setIsFetching] = useState(false);
    const [questions, setQuestions] = useState<any>([]);

    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    const handleSearch = (e : any) => {
        setQuery(e.target.value)
    }

    const handleButtonEdit = () => {
        appRouter.replace("/dashboard/Admin/MisQuizes/Editor/"+ params.id);
    }

    const fetchQuizReport = async () => {
        setIsFetching(true);
        const userCookies = await getCookie("userCookies");
        const userCookiesObj = JSON.parse(userCookies.value);
        const session = userCookiesObj.sessionKey;
        axios
            .get(apiURL + `responses/quizResponses/${params.id}`, {
                headers: {
                    sessionKey: session
                },
            })
            .then((res) => {
                setQuizReport(res.data);
                console.log(res.data);
                setIsFetching(false);
              })
              .catch((err) => {
                console.log(err);
                setIsFetching(false);
              });
    }

    useEffect(() => {
        if(quizReport === undefined && !isFetching) fetchQuizReport();
    }, [])

    useEffect(() => {
        if(quizReport !== undefined) {
            let questionMap = new Map<string, any>();
            quizReport.QuizData.questions.map((question : any, index : number) => {
                const questionData = {
                    question: question.question_text,
                    ans1: question.question_ans1,
                    ans2: question.question_ans2,
                    ans3: question.question_ans3,
                    ans4: question.question_ans4,
                    correct: question.correct_answer,
                    responses: []
                }
                questionMap.set(question.question_id, questionData);
            })
        
            quizReport.QuizSubmissions.map((submission : any, index : number) => {
                submission.responses.map((answer : any, index : number) => {
                    questionMap.get(answer.question_id).responses.push(answer);
                })
            })
            console.log("Question Map");
            console.log(questionMap);
            // Convert the map to an array
            let questionArray : any = [];
            questionMap.forEach((value, key) => {
                questionArray.push(value);
            })
            console.log(questionArray);
            setQuestions(questionArray);
        }
    }, [quizReport])


    return (
        <div className='mainContainer'>
            <div className='header'>
                <div className='headerContainer'>
                    <Link href="/dashboard/Admin/MisQuizes">
                        <button className='returnButton'> <IoIosArrowBack size={40}/> </button>
                    </Link>
                    <h1 className='headerText'>{quizReport?.QuizData.quiz_name}</h1>
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
                                <p className='statNumber'>{quizReport?.QuizData.QuizStats.average_score}</p>
                                <p className='statPercent'>%</p>
                            </div>
                            <div className='flex justify-center items-center -mt-2 text-center'>
                                <p className='statDescription'>Precision Promedia</p>
                            </div>
                        </div>

                        <div className='statContainer2'>
                            <div className='flex flex-row justify-center items-baseline'>
                                <p className='statNumber'>{quizReport?.QuizData.QuizStats.average_confidence}</p>
                                <p className='statPercent'>%</p>
                            </div>
                            <div className='flex justify-center items-center -mt-2 text-center'>
                                <p className='statDescription'>Confianza Promedio</p>
                            </div>
                        </div>

                        <div className='statContainer3'>
                            <div className='flex flex-row justify-center items-baseline'>
                                <p className='statNumber'>{quizReport?.QuizData.QuizStats.averagePerformance}</p>
                                <p className='statPercent'>%</p>
                            </div>
                            <div className='flex justify-center items-center -mt-2 text-center'>
                                <p className='statDescription'>Desempeño Promedio</p>
                            </div>
                        </div>
                    </div>

                    <div className='questionsAccordionContainer'>
                        {/*
                            quizReport?.QuizData.questions.map((question : any, index : number) => {
                                return (
                                    <QuestionStats data={dummyBarData} contentAI={defaultContent} precisionV={97} confidenceV={89}/>
                                )
                            })
                        */
                            // map over each value in the questions map
                            questions.map((question : any, index : number) => {
                                return (
                                    question.question !== "" &&(
                                        <QuestionStats questionData={question} index={index+1}/>
                                    )
                                )
                            })
                        }

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
                                    <div className='studentCard' key={student.id}>
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
