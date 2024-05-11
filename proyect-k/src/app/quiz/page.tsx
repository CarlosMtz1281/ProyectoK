"use client";

import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Chip,
} from "@mui/material";
import PlayerCard from "@/components/Quiz/PlayerCard";
import BarGraph from "@/components/Quiz/BarGraph";

import { MoreVert } from "@mui/icons-material";

export default function Quiz() {
  return (
    <div className="flex flex-col">
      <Box id="titlebox" className="flex row mx-auto my-12">
        <Typography variant="h3" className="font-thin">
          Pregunta: tigres o rayados?
        </Typography>
      </Box>
      <Box
        id="middle box"
        className="flex flex-row p-10 flex-start w-full h-6/12 flex-wrap"
      >
        <Box id="ai player stats" className="flex flex-row w-6/12">
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
        </Box>
        <Box id="bar graph boxy" className="flex w-6/12">
          <BarGraph />
        </Box>
      </Box>
      <Box id="User Options"></Box>
    </div>
  );
}
