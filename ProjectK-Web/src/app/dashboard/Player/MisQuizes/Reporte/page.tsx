"use client";

import React, { useRef, useEffect, useState } from "react";
import "@/styles/ReportePlayer.css";
import "chart.js/auto";
import dynamic from "next/dynamic";
import axios from "axios";
import { Analytics } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import { set } from "firebase/database";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getCookie } from "@/app/utils/getcookie";
import ChatBot from "@/components/general/chatBot";
import Button from '@mui/material/Button';


interface Response {
  response_id: number;
  report_id: number;
  answer: number;
  question_id: number;
  confidence: number;
  quiz_id: number;
}

interface Report {
  report_id: number;
  quiz_id: number;
  user_id: number;
  analysis: string;
  score: number;
  created_at: string;
}

interface ReportData {
  report: Report;
  responses: Response[];
}

export default function Reporte() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const Radar = dynamic(
    () => import("react-chartjs-2").then((mod) => mod.Radar),
    { ssr: false }
  );

  const data = {
    labels: [
      "Correctas",
      "Incorrectas",
      "Calificacion",
      "Confianza",
      "Desempeño",
    ],
    datasets: [
      {
        label: name + " " + lastName,
        data: [28, 48, 40, 96, 19],
        fill: true,
        backgroundColor: "rgba(92, 93, 94, 0.25)",
        borderColor: "rgb(92, 93, 94)",
        pointBackgroundColor: "rgb(92, 93, 94)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(92, 93, 94)",
      },
    ],
  };

  const api = process.env.NEXT_PUBLIC_API_URL;

  const [reportData, setReportData] = useState({} as any);

  const [analysis, setAnalysis] = useState("feedback");

  const [precisionPromedio, setPrecisionPromedio] = useState(0);
  const [confianzaPromedio, setConfianzaPromedio] = useState(0);
  const [calificacionObtenida, setCalificacionObtenida] = useState(0);
  const [exactDate, setExactDate] = useState("");
  const [preformance, setPreformance] = useState(0);
  const [reportId, setReportId] = useState(0);
  //chatbot
  const [chatStarted, setChatStarted] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [quizName, setQuizName] = useState("");

  // Cookies must be fetched like this
  const cookieGetter = async () => {
    const userCookiesObj = JSON.parse(await getCookie("userCookies"));
    const firstname = userCookiesObj.first_name;
    const secondname = userCookiesObj.last_name;
    const cookiereportid = await getCookie("reporte_Id");
    const session = userCookiesObj.sessionKey;

    setName(firstname);
    setLastName(secondname);
    setReportId(Number(cookiereportid));

    axios
      .get(api + `responses/${cookiereportid}`, {headers: {sessionKey: session}})
      .then(async (response) => {
        await setReportData(response.data);
        console.log(response.data);
        formatAnalysis();
        calculateStats();

      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("Fetching data");

    cookieGetter();
  }, []);

  useEffect(() => {
    if (reportData.report) {
      formatAnalysis();
      const date = new Date(reportData.report.created_at);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const amOrPm = hours >= 12 ? "pm" : "am";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedDate = `${formattedHours}:${formattedMinutes} ${amOrPm}, ${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      setExactDate(formattedDate);
    }
    if (reportData.responses) {
      calculateStats();
    }
  }, [reportData]);

  function formatAnalysis() {
    //format analisis
    const formattedAnalysis = reportData.report.analysis;
    setAnalysis(formattedAnalysis);
  }

  function calculateStats() {
    console.log("calculateStats");
    let totalConfidence = 0;

    reportData.responses.forEach((response: any) => {
      totalConfidence += response.confidence;
    });

    const averageConfidence = Math.round(
      (totalConfidence * 10) / reportData.responses.length
    );
    const averageScore = Math.round(
      (100 / reportData.responses.length) * reportData.report.score
    );

    setCalificacionObtenida(averageScore);
    setConfianzaPromedio(averageConfidence);
    setPreformance(Math.round((averageScore + averageConfidence) / 2));
  }

  function getOptionTxt(option: number, response: any) {
    if (option === 1) {
      return response.question_ans1;
    } else if (option === 2) {
      return response.question_ans2;
    } else if (option === 3) {
      return response.question_ans3;
    }
    return response.question_ans4;

  }

  return (
    <div className="flex flex-row w-full">
      {reportData.report && (
        <div className="stats-half">
          <div>
            <p className="report-title">Resultados del Quiz</p>
            <p className="report-date">
              {name} {lastName} contestó a las {exactDate}
            </p>
          </div>
          <div className="flex h-full w-full">
            <div className="graph-container">
              <Radar data={data} />
            </div>
          </div>
        </div>
      )}
      {reportData.responses && (
        <div className="feedback-half">
          <div className="general-stats">
            <div className="stat-container1">
              <div className="flex flex-row justify-center items-baseline">
                <p className="stat-number">{preformance}</p>
                <p className="stat-percent">%</p>
              </div>
              <div className="flex justify-center items-center -mt-2 text-center">
                <p className="stat-description">Desempeño General</p>
              </div>
            </div>

            <div className="stat-container2">
              <div className="flex flex-row justify-center items-baseline">
                <p className="stat-number">{confianzaPromedio}</p>
                <p className="stat-percent">%</p>
              </div>
              <div className="flex justify-center items-center -mt-2 text-center">
                <p className="stat-description">Confianza Promedio</p>
              </div>
            </div>

            <div className="stat-container3">
              <div className="flex flex-row justify-center items-baseline">
                <p className="stat-number">{calificacionObtenida}</p>
                <p className="stat-percent">%</p>
              </div>
              <div className="flex justify-center items-center -mt-2 text-center">
                <p className="stat-description">Calificación Obtenida</p>
              </div>
            </div>
          </div>

          <div className="title-analysis">
            <p>Análisis supercargado por Gemini &#x2728;</p>
          </div>

          <div className="analysis-container">
            <ReactMarkdown>{analysis}</ReactMarkdown>
            <div className="acordeonContainer">
              <br />
              <p>
                <strong>Resumen de preguntas</strong>
              </p>
              {reportData.responses.map((response: any, index: any) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}a-content`}
                    id={`panel${index}a-header`}
                  >
                    <Typography>{response.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
    <Typography>
        Your answer: {getOptionTxt(response.answer, response)} <br />
        Correct answer: {getOptionTxt(response.correct_answer,response)} <br />
        Confidence: {response.confidence}
    </Typography>
    <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: 'auto' }}
        onClick={() => {
            setPrompt(response.question);
            setChatStarted(true); }}
    >
        Pregunatle al profesor virtual
    </Button>
</AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>

        </div>
      )}
        {chatStarted && <ChatBot question={prompt} />}
    </div>
  );
}
