"use client";

import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";


export default function Home() {
  const appRouter = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const sendToLogin = () => {
    appRouter.replace("/gates/login");
  };

  const sendToRegistration = () => {
    appRouter.replace("/gates/register");
  };

  const [checkEmailLocal, setCheckEmailLocal] = useState('');

  // We move into the dashboard if the user was already in
  // useEffect(() => {
  //   setCheckEmailLocal(localStorage.getItem("email") ?? '');
  //   const timer = setTimeout(() => {
  //     if (checkEmailLocal !== null) {
  //       appRouter.replace("/dashboard");
  //     }
  //     setIsLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className="MainHTMLBody">
      <Box
        sx={{
          alignSelf: "center",
          marginLeft: 5,
          marginRight: 5,
          gap: 5,
          display: "flex",
          flexDirection: "column",
          maxWidth: 400,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          WBAN solutions
        </Typography>
        <Typography variant="h2">QuizOnline</Typography>
        <Typography variant="h6">
          Tu quiz online. Practica cuando necesites y analiza tus habilidades.
        </Typography>
        <Grid container spacing={3}>
          <Grid item>
            <Button onClick={sendToLogin} size="large" variant="contained">
              Ingresar
            </Button>
          </Grid>

          <Grid item>
            <Button
              onClick={sendToRegistration}
              size="large"
              variant="outlined"
            >
              Crear cuenta
            </Button>
          </Grid>
        </Grid>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </div>
  );
}
