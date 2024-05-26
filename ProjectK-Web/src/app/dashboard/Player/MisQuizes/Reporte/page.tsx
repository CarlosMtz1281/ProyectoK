'use client'

import React, { useRef, useEffect } from 'react'
import "@/styles/ReportePlayer.css"
import 'chart.js/auto'
import dynamic from 'next/dynamic'

const name = localStorage.getItem("first_name") ?? "No";
const lastName = localStorage.getItem("last_name") ?? "Name";
const fecha = "FECHA";
const hora = "HORA";
const feedback = "Mira, respetuosamente, no te voy a contestar nada porque tú sabías. No voy a contestar nada, ni voy a comentar absolutamente nada, ni voy a decir nada. Pero tú sabías eso. No te voy a contestar nada, sí, lo sabías. Entonces, no te voy a contestar nada. ¿Anduviste con ella cuánto, tres meses, cuatro meses, cinco meses? No te voy a contestar nada. ¿Por qué, Alfredo? ¿Por qué? Pues, porque no tiene sentido, porque una persona así no vale la pena. Una persona que engaña y miente y hace esas cosas como las que quiso hacer conmigo, usarme y todo, no tiene derecho a nada. ¿Te duele que te haya ocultado que era...? No te voy a contestar, amigo. No te voy a contestar nada. ¿Pero por qué?"

const Radar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Radar), {ssr: false})

const data = {
    labels: [
      'Correctas',
      'Incorrectas',
      'Calificacion',
      'Confianza',
      'Desempeño'
    ],
    datasets: [{
        label: `${name} ${lastName}`,
        data: [28, 48, 40, 96, 19],
        fill: true,
        backgroundColor: 'rgba(92, 93, 94, 0.25)',
        borderColor: 'rgb(92, 93, 94)',
        pointBackgroundColor: 'rgb(92, 93, 94)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(92, 93, 94)'
      }, {
        label: 'Jugador Promedio',
        data: [65, 59, 90, 81, 56],
        fill: true,
        backgroundColor: 'rgba(200, 200, 200, 0.35)',
        borderColor: 'rgb(200, 200, 200)',
        pointBackgroundColor: 'rgb(200, 200, 200)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(200, 200, 200)'
      }]  
};

export default function Reporte() {
    return (
        <div className="flex flex-row w-full">
            <div className="stats-half">
                <div>
                    <p className='report-title'>Resultados del Quiz</p>
                    <p className='report-date'>
                        {name} {lastName} contestó el {fecha} a las {hora}
                    </p>
                </div>
                <div className='flex h-full w-full'>
                    <div className='graph-container'>
                        <Radar data={data} />
                    </div>
                </div>
            </div>
            <div className="feedback-half">
                <div className='general-stats'>
                    <div className='stat-container1'>
                        <div className='flex flex-row justify-center items-baseline'>
                            <p className='stat-number'>97</p>
                            <p className='stat-percent'>%</p>
                        </div>
                        <div className='flex justify-center items-center -mt-2 text-center'>
                            <p className='stat-description'>Precision Promedia</p>
                        </div>
                    </div>

                    <div className='stat-container2'>
                        <div className='flex flex-row justify-center items-baseline'>
                            <p className='stat-number'>89</p>
                            <p className='stat-percent'>%</p>
                        </div>
                        <div className='flex justify-center items-center -mt-2 text-center'>
                            <p className='stat-description'>Confianza Promedio</p>
                        </div>
                    </div>

                    <div className='stat-container3'>
                        <div className='flex flex-row justify-center items-baseline'>
                            <p className='stat-number'>64</p>
                            <p className='stat-percent'>%</p>
                        </div>
                        <div className='flex justify-center items-center -mt-2 text-center'>
                            <p className='stat-description'>Calificación Obtenida</p>
                        </div>
                    </div>
                </div>

                <div className='title-analysis'>
                    <p>Análisis supercargado por Gemini &#x2728;</p>
                </div>

                <div className='analysis-container'>
                    <p>{feedback}</p>
                </div>
            </div>
        </div>
    )
}
