import React from "react";
import {
  Card,
  Avatar,
  CardContent,
  Typography,
  CardHeader,
} from "@mui/material";

export default function PlayerCard() {
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            P
          </Avatar>
        }
        title="Perenganito"
        subheader="Estudiante de Comunicación"
      />
      <CardContent>
        <Typography>Respuestas en total: 4</Typography>
        <Typography>Respuestas en total: 4</Typography>
        <Typography>Respuestas en total: 4</Typography>
        <Typography>Respuestas en total: 4</Typography>
        <Typography>Respuestas en total: 4</Typography>
      </CardContent>
    </Card>
  );
}
