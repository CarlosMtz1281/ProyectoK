"use client";

import React from "react";
import {
  Box,
  Typography,
  Slider,
} from "@mui/material";

interface UserButtonsProps {
    value?: number, 
    handleSliderChange: any,
}

export default function QuizSlider({value, handleSliderChange}: UserButtonsProps) {
  return (
    <Box id="conf slider" className="flex w-8/12 justify-center flex-col mt-6">
      <Typography variant="body1" className="font-thin">
        Nivel de confianza:
      </Typography>
      <Box className="w-full flex flex-row items-center gap-6 mt-3">
        <Slider
          value={typeof value === "number" ? value : 0}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
        />
        <Typography>{value}</Typography>
      </Box>
    </Box>
  );
}
