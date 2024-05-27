import React from "react"
import { Grid, Typography, TextField, Paper } from "@mui/material"
import { FaPencil } from "react-icons/fa6";

export default function QuizTitle() {
    return (
        <div className = 'flex flex-col w-full gap-6'>
            <Typography variant = 'h6' className = 'font-thin font-serif'> Título del Examen: </Typography>
            <div className = 'flex flex-row w-full'>
                <TextField variant = 'standard' placeholder="Quiz de los Papus" className = 'w-3/4' />
                <FaPencil className = 'w-1/4 self-end' />
            </div>
        </div>
    );
}