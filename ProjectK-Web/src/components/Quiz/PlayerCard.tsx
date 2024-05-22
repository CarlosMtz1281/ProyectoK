import React from "react";
import {
  Card,
  Avatar,
  CardContent,
  Typography,
  CardHeader,
  CardMedia,
} from "@mui/material";

interface PlayerCardProps {
  backgroundColor?: string;
  isUser: boolean;
}

export default function PlayerCard() {
  return (
    <Card className="w-4/12  bg-orange-200">
      <CardHeader
        avatar={
          <CardMedia
            component="img"
            sx={{ height: 50, objectFit: "contain" }}
            image="/image 20.png"
            title="green iguana"
          />
        }
        title="Perenganito"
        subheader="Estudiante"
      />
      <CardContent>
        <Typography>Respuestas: 4</Typography>
        <Typography>Correctas: 4</Typography>
        <Typography>Errores: 4</Typography>
        <Typography>Resultado final: 4</Typography>
        <Typography>Confianza final: 4</Typography>
        <Typography>Desempeño: 4</Typography>
      </CardContent>
    </Card>
  );
}
