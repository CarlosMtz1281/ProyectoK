'use client'

import React from 'react';
import Modal from '@mui/material/Modal';
import { BsFillInfoCircleFill } from "react-icons/bs";
import Box from '@mui/material/Box';
import '@/styles/ReportAdminModal.css';
import '@/styles/ReporteAdmin.css';
import ReactMarkdown from "react-markdown";
import { RoundedCorner } from '@mui/icons-material';
import { BiBorderRadius } from 'react-icons/bi';
import { useEffect } from 'react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: '75vh',
    width: '75vw',
    BiBorderRadius: '10px'
};

interface ReportAdminModalProps {
    name?: string;
    contentAI?: string;
    quizResponse?: QuizResponse;
    quizData?: QuizData;
}

interface QuizResponse {
    created_at: string;
    quiz_id: number;
    report_analysis: string;
    report_id: number;
    responses: any;
    user_id: number;
    user_name: string;
    user_score: number;
}

interface QuizData {
    QuizStats: any;
    admin_id: number;
    author_name: string;
    questions: any;
    quiz_id: number;
    quiz_name: string;
    topic_id: number;
    topic_name: string;
}

interface ResponseStats {
    precision: number;
    confianza: number;
    desempeño: number;
}

export default function ReportAdminModal({quizResponse, quizData}: ReportAdminModalProps) {
    const [open, setOpen] = React.useState(false);
    const [responseStats, setResponseStats] = React.useState<ResponseStats | undefined>(undefined);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if(quizResponse !== undefined){
            let precision = 0;
            let confianza = 0;
            let desempeño = 0;
            quizResponse.responses.forEach((response : any, index : number) => {
                if(response.user_answer == quizData?.questions[index].correct_answer){
                    precision++;
                }
                confianza = confianza + response.user_confidence*10;
            })
            precision = (precision/quizResponse.responses.length)*100;
            confianza = (confianza/quizResponse.responses.length);
            desempeño = (precision+confianza)/2;
            setResponseStats({
                precision: precision,
                confianza: confianza,
                desempeño: desempeño
            })
        }
    },[])
  
    return (
      <div>
        <button onClick={handleOpen}><BsFillInfoCircleFill size={'3vh'} style={{marginLeft:"10px"}}/></button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <Box className='boxModal' sx={style}>
                <div className='mainContainerModal'>
                    <div className='w-full border-b-2'>
                        <p className='text-2xl '>{quizResponse?.user_name}</p>
                    </div>
                    <div className='statsFeedbackContainer'>
                        <div className='statsModalContainer'>
                            <div className='colorModalStat1'>
                                <div className='flex flex-row justify-center items-baseline'>
                                    <p className='statNumber'>{responseStats?.precision}</p>
                                    <p className='statPercent'>%</p>
                                </div>
                                <div className='flex justify-center items-center -mt-2 text-center'>
                                    <p className='statDescription'>Precision Promedia</p>
                                </div>
                            </div>

                            <div className='colorModalStat2'>
                                <div className='flex flex-row justify-center items-baseline'>
                                    <p className='statNumber'>{responseStats?.confianza}</p>
                                    <p className='statPercent'>%</p>
                                </div>
                                <div className='flex justify-center items-center -mt-2 text-center'>
                                    <p className='statDescription'>Confianza Promedio</p>
                                </div>
                            </div>

                            <div className='colorModalStat3'>
                                <div className='flex flex-row justify-center items-baseline'>
                                    <p className='statNumber'>{responseStats?.desempeño}</p>
                                    <p className='statPercent'>%</p>
                                </div>
                                <div className='flex justify-center items-center -mt-2 text-center'>
                                    <p className='statDescription'>Desempeño Promedio</p>
                                </div>
                            </div>
                        </div>
                        <div className='modalFeedbackAI'>
                            <p className='text-xl text-center font-bold'> Reporte de la IA </p>
                            <div className=' py-4 px-2'>
                                <ReactMarkdown>{quizResponse?.report_analysis}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                    <div className ='statsAnswersContainer'>
                        <h2 className='text-2xl font-bold w-full text-center'>Respuestas</h2>
                        {
                            quizResponse?.responses.map((response : any, index : number) => {
                                return (
                                    <div className='responseContainer'>
                                        <p className='text-xl font-bold'>{index+1}. &nbsp;{response.question_text}</p>
                                        <div className='optionsContainer'>
                                            <div className={`optionContainer ${quizData?.questions[index].correct_answer == 1 ? "correctOption" : ""} ${quizResponse.responses[index].user_answer === 1 && quizData?.questions[index].correct_answer !== 1 ? "incorrectOption" : ""}`}><b>A. </b> &nbsp;{quizData?.questions[index].question_ans1}</div>
                                            <div className={`optionContainer ${quizData?.questions[index].correct_answer == 2 ? "correctOption" : ""} ${quizResponse.responses[index].user_answer === 2 && quizData?.questions[index].correct_answer !== 2 ? "incorrectOption" : ""}`}><b>B. </b> &nbsp;{quizData?.questions[index].question_ans2}</div>
                                            <div className={`optionContainer ${quizData?.questions[index].correct_answer == 3 ? "correctOption" : ""} ${quizResponse.responses[index].user_answer === 3 && quizData?.questions[index].correct_answer !== 3 ? "incorrectOption" : ""}`}><b>C. </b> &nbsp;{quizData?.questions[index].question_ans3}</div>
                                            <div className={`optionContainer ${quizData?.questions[index].correct_answer == 4 ? "correctOption" : ""} ${quizResponse.responses[index].user_answer === 4 && quizData?.questions[index].correct_answer !== 4 ? "incorrectOption" : ""}`}><b>D. </b> &nbsp;{quizData?.questions[index].question_ans4}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Box>
        </Modal>
      </div>
    );
  }