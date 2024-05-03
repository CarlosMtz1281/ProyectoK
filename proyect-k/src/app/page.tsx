'use client'

import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const appRouter = useRouter();

  const sendToLogin = () => {
    appRouter.replace('/login');
  }

  const sendToRegistration = () => {
    appRouter.replace('/register');
  }
  
  return (
    <div className="MainHTMLBody">
      <Box sx = {{alignSelf: "center", marginLeft: 5, marginRight: 5, gap: 5, display: "flex", flexDirection: "column", maxWidth: 400 }}>

        <Typography variant = "h6" sx = {{fontWeight: "bold"}}>
          WBAN solutions
        </Typography>
        <Typography variant = "h2">
          QuizOnline
        </Typography>
        <Typography variant = "h6">
          Tu quiz online. Practica cuando necesites y analiza tus habilidades.
        </Typography>
        <Grid container spacing = {3}>

          <Grid item>
            <Button onClick = {sendToLogin} size = "large" variant = "contained">Ingresar</Button>
          </Grid>

          <Grid item>
            <Button onClick = {sendToRegistration} size = "large" variant = "outlined">Crear cuenta</Button>
          </Grid>

        </Grid>
      </Box>
    </div>
  );
}
