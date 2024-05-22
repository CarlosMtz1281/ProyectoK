'use client'

import React from 'react';
import Modal from '@mui/material/Modal';
import '../../styles/gameModal.css';
import Image from 'next/image';
import { useRouter } from "next/navigation";

export default function GameModal({
    open,
    handleClose,
} : {
    open: boolean;
    handleClose: () => void;
}) {

    const appRouter = useRouter();

    const handleClickQuiz = () => {
        appRouter.replace("/quiz");
    }

    const handleClickGame = () => {
        appRouter.replace("/game");
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='container-modal'>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='modal-title'>
                            <p>Elige como quieres practicar este quiz</p>
                        </div>
                        <div className='flex flex-row justify-center items-center gap-x-16'>
                            <div className='flex flex-col'>
                                <button className='game-button' onClick={handleClickQuiz}>
                                    <div className='modal-image-container'>
                                        <Image 
                                            src="/game_Preview.png"
                                            className="modal-image"
                                            alt="foto"
                                            fill
                                        />
                                    </div>
                                    <div className='modal-description-container'>
                                        <p>Quiz</p>
                                    </div>
                                </button>
                            </div>
                            <div className='flex flex-col'>
                                <button className='game-button' onClick={handleClickGame}>
                                    <div className='modal-image-container'>
                                        <Image 
                                            src="/game_Preview.png"
                                            className="modal-image"
                                            alt="foto"
                                            fill
                                        />
                                    </div>
                                    <div className='modal-description-container'>
                                        <p>Juego</p>
                                    </div>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    )
}