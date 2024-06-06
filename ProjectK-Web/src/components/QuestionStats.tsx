'use client'

import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import '@/styles/QuestionStats.css';
import { useState, useEffect } from 'react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const barOptions = {
    indexAxis: 'y' as 'x' | 'y',
    layout: {
        padding: 10
    },
    plugins: {
        legend: {
            display: false,
        },
    },
    maintainAspectRatio: false,
    responsive: true,
    barThickness: 20,
    barPercentage: 0.5,
    scales: {
        x: {
            grid: {
              offset: true
            },
            suggestedMin: 0,
            suggestedMax: 10
        },
        y: {
            suggestedMin: 0,
            suggestedMax: 100
        },
    }
}

interface QuestionStatsProps {
    questionData?: any;
    index?: number;
}

interface questionStatsData {
    precision: number;
    confianza: number;
    graphData: any;
}


export default function QuestionStats({questionData, index}: QuestionStatsProps) {

    const [questionStatsData, setQuestionStatsData] = useState<questionStatsData | undefined>(undefined);
    useEffect(() => {
        let counter = 0;
        let precision = 0;
        let confidence = 0;
        let responses = [
            {
                label: 'A',
                data: [0],
                backgroundColor: 'rgba(255, 99, 132)',
            },
            {
                label: 'B',
                data: [0],
                backgroundColor: 'rgba(54, 162, 235)',
            },
            {
                label: 'C',
                data: [0],
                backgroundColor: 'rgba(255, 206, 86)',
            },
            {
                label: 'D',
                data: [0],
                backgroundColor: 'rgba(75, 192, 192)',
            },

        ];

        for(const response in questionData.responses) {
            counter ++;
            confidence += (questionData.responses[response] as any).user_confidence * 10;
            if((questionData.responses[response] as any).user_answer === questionData.correct) {
                precision ++;
            }

            responses[(questionData.responses[response] as any).user_answer - 1].data[0] ++;
        }
        precision = precision / counter * 100;
        //console.log("confidence: ", confidence, " precision: ", precision);
        //console.log(questionData);
        //console.log(responses);

        const responesFormatted = {
            labels: [''],
            datasets: responses
        }
        setQuestionStatsData({
            precision: precision,
            confianza: confidence,
            graphData: responesFormatted
        });
    }, [])

    return (
        <Accordion
            style={{
                margin: '0.75rem 0',
                boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',
            }}
        >
            <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ 
                    backgroundColor: '#F5F5F5',
                    padding: '1rem 2rem',

                }}
            >
                <h1 className=' font-bold text-xl '>Pregunta {index}</h1>
            </AccordionSummary>
            <AccordionDetails>
                <div className='questionContainer'>
                    <div className='feedbackContainer'>
                        <div className=' font-bold text-xl '>
                            <p>{questionData?.question}</p>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                            <div className = {`${questionData?.correct === 1 ? "CorrectOptionContainer" : "OptionContainer"}`}>
                                <b>A.</b>&nbsp; {questionData?.ans1} 
                            </div>
                            <div className = {`${questionData?.correct === 2 ? "CorrectOptionContainer" : "OptionContainer"}`}>
                                <b>B.</b>&nbsp; {questionData?.ans2}
                            </div>
                            <div className = {`${questionData?.correct === 3 ? "CorrectOptionContainer" : "OptionContainer"}`}>
                                <b>C.</b>&nbsp; {questionData?.ans3}
                            </div>
                            <div className = {`${questionData?.correct === 4 ? "CorrectOptionContainer" : "OptionContainer"}`}>
                                <b>D.</b>&nbsp; {questionData?.ans4}
                            </div>
                        </div> 
                    </div>
                    <div className='questionStatsContainer'>
                        <div className='preconfContainer'>
                            <div className='pcStatContainer'>
                                <p className='font-bold'>Precision</p>
                                <div className='w-full h-full'>
                                    <Gauge
                                        value={questionStatsData?.precision}
                                        startAngle={-110}
                                        endAngle={110}
                                        sx={{
                                            [`& .${gaugeClasses.valueText}`]: {
                                            fontSize: '1rem',
                                            transform: 'translate(0px, 0px)',
                                            },
                                            [`& .${gaugeClasses.valueArc}`]: {
                                                fill: '#76B459',
                                            },
                                            height: '90%',
                                            width: '100%'
                                        }}
                                        text={
                                            ({ value, valueMax }) => `${value} / ${valueMax}`
                                        }
                                    />
                                </div>

                            </div>
                            <div className='pcStatContainer'>
                                <p className='font-bold'>Confianza</p>
                                <div className='w-full h-full'>
                                    <Gauge
                                        value={questionStatsData?.confianza}
                                        startAngle={-110}
                                        endAngle={110}
                                        sx={{
                                            [`& .${gaugeClasses.valueText}`]: {
                                            fontSize: '1rem',
                                            transform: 'translate(0px, 0px)',
                                            },
                                            [`& .${gaugeClasses.valueArc}`]: {
                                                fill: '#3A98DB',
                                            },
                                            height: '90%',
                                            width: '100%'
                                        }}
                                        text={
                                            ({ value, valueMax }) => `${value} / ${valueMax}`
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='respuestasContainer'>
                            <div>
                                <p className='font-bold'>Respuestas</p>
                            </div>
                            <div className='barContainer'>
                                { questionStatsData !== undefined &&(
                                    <Bar data={questionStatsData.graphData} options={barOptions} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}