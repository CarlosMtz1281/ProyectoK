import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function EditorBanner() {
  return (
    <div className=" w-full h-32 flex gap-8 justify-start items-center mb-6">
      <Button variant =  "contained" color = "info">
        <ArrowBack />
      </Button>
      <Typography variant = 'h4' className = 'font-thin'>Editor de Quizzes</Typography>
    </div>
  );
}
