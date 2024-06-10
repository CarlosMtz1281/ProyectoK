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
import { LuBrain } from "react-icons/lu";
import LandingLogin from "@/components/Landing/LandingLogIn";
import LandingRegister from "@/components/Landing/LandingRegister";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  const appRouter = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const sendToLogin = () => {
    appRouter.replace("/gates/login");
  };

  const sendToRegistration = () => {
    appRouter.replace("/gates/register");
  };

  const [checkEmailLocal, setCheckEmailLocal] = useState("");

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
        <div className="flex flex-row gap-5 items-center">
          <LuBrain size={82} />
          <Typography variant="h1" className="font-thin">
            Ixpolin
          </Typography>
        </div>
        <TypeAnimation
          sequence={[
            "Tu quiz online. Práctica cuando necesites y analiza tus habilidades.",
            1000,
            "Práctica con nuestro juego antes de tus examenes!!",
            1000,
            "Administra, crea, edita tus exámenes y deja que Gemini haga los análisis por ti!",
            1000,
          ]}
          wrapper="span"
          speed={50}
          className="TypingLanding"
          repeat={Infinity}
        />
        <Grid className="min-h-16" container spacing={3}>
          <Grid item xs={6}>
            <LandingLogin onClick={sendToLogin} />
          </Grid>

          <Grid item xs={6}>
            <LandingRegister onClick={sendToRegistration} />
          </Grid>
        </Grid>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
      <div className="leftside">
        <iframe
          allow="fullscreen"
          height="600"
          width="600"
          src="https://giphy.com/embed/SE4TI6jZe3fm3OmzuZ/video"
        ></iframe>
      </div>
    </div>
  );
}
