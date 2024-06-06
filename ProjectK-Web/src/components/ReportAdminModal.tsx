
import React from 'react';
import Modal from '@mui/material/Modal';
import { BsFillInfoCircleFill } from "react-icons/bs";
import Box from '@mui/material/Box';
import '@/styles/ReportAdminModal.css';
import '@/styles/ReporteAdmin.css';
import { RoundedCorner } from '@mui/icons-material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: '70vh',
    width: '60vw',
};

interface ReportAdminModalProps {
    name: string;
    precision?: number;
    confianza?: number;
    desempeno?: number;
    contentAI?: string;
}

export default function ReportAdminModal({name, precision, confianza, desempeno, contentAI}: ReportAdminModalProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        <button onClick={handleOpen}><BsFillInfoCircleFill size={'3vh'} style={{marginLeft:"10px"}}/></button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className='mainContainerModal'>
                    <div className='w-full border-b-2'>
                        <p className='text-2xl '>{name}</p>
                    </div>
                    <div className='statsFeedbackContainer'>
                        <div className='statsModalContainer'>
                            <div className='colorModalStat1'>
                                <div className='flex flex-row justify-center items-baseline'>
                                    <p className='statNumber'>97</p>
                                    <p className='statPercent'>%</p>
                                </div>
                                <div className='flex justify-center items-center -mt-2 text-center'>
                                    <p className='statDescription'>Precision Promedia</p>
                                </div>
                            </div>

                            <div className='colorModalStat2'>
                                <div className='flex flex-row justify-center items-baseline'>
                                    <p className='statNumber'>89</p>
                                    <p className='statPercent'>%</p>
                                </div>
                                <div className='flex justify-center items-center -mt-2 text-center'>
                                    <p className='statDescription'>Confianza Promedio</p>
                                </div>
                            </div>

                            <div className='colorModalStat3'>
                                <div className='flex flex-row justify-center items-baseline'>
                                    <p className='statNumber'>64</p>
                                    <p className='statPercent'>%</p>
                                </div>
                                <div className='flex justify-center items-center -mt-2 text-center'>
                                    <p className='statDescription'>Desempeño Promedio</p>
                                </div>
                            </div>
                        </div>
                        <div className='modalFeedbackAI'>
                            <p className='text-xl text-center'> Información de la IA </p>
                            <div className=' py-4 px-2'>
                                <p> {contentAI} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
      </div>
    );
  }