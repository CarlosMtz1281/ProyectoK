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
            suggestedMax: 100
        },
        y: {
            suggestedMin: 0,
            suggestedMax: 100
        },
    }
}

interface QuestionStatsProps {
    data: any;
    contentAI: string;
    precisionV: number;
    confidenceV: number;
}

export default function QuestionStats({data, contentAI, precisionV, confidenceV}: QuestionStatsProps) {
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
                <h1 className=' font-bold text-xl '>Pregunta 1</h1>
            </AccordionSummary>
            <AccordionDetails>
                <div className='questionContainer'>
                    <div className='feedbackContainer'>
                        <div className=' font-bold text-xl '>
                            <p>Información de la AI</p>
                        </div>
                        <div className=' text-sm'>
                            <p> {contentAI}</p>
                        </div> 
                    </div>
                    <div className='questionStatsContainer'>
                        <div className='preconfContainer'>
                            <div className='pcStatContainer'>
                                <p className='font-bold'>Precision</p>
                                <div className='w-full h-full'>
                                    <Gauge
                                        value={precisionV}
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
                                        value={confidenceV}
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
                                <Bar data={data} options={barOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}