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
  Button,
  Slider,
  Input,
} from "@mui/material";
import PlayerCard from "@/components/Quiz/PlayerCard";
import BarGraph from "@/components/Quiz/BarGraph";

export default function UserButtons() {
  return (
    <Box id="user buttons" className="flex w-full h-full">
      <Grid container spacing={0} className="flex justify-center h-44">
        <Grid item xs={6} className="flex justify-center">
          <Button
            className="flex h-full w-full"
            variant="contained"
            color="info"
          >
            Tigres
          </Button>
        </Grid>
        <Grid item xs={6} className="flex justify-center">
          <Button
            className="flex h-full w-full"
            variant="contained"
            color="success"
          >
            Rayados
          </Button>
        </Grid>
        <Grid item xs={6} className="flex justify-center">
          <Button
            className="flex h-full w-full"
            variant="contained"
            color="error"
          >
            Cruz Azul
          </Button>
        </Grid>
        <Grid item xs={6} className="flex justify-center">
          <Button
            className="flex h-full w-full"
            variant="contained"
            color="warning"
          >
            Lakers
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
