import React from "react"
import { Grid, Typography, TextField, Paper } from "@mui/material"
import { FaPencil } from "react-icons/fa6";
import TextFieldComponent from "./TextFieldController";

export default function QuizTitle() {
    return (
        <div className = 'flex flex-col h-full w-full gap-6'>
            <Typography variant = 'h6' className = 'font-thin font-serif'> Título: </Typography>
            <Paper elevation={24} className = 'flex flex-row w-full h-1/2 justify-center items-center'>
                <TextFieldComponent name = "name" label = "Title" rules = {null} />
            </Paper>
        </div>
    );
}