"use client";

import React from "react";
import {
  Paper,
  Typography,
  Button,
  Grid,
  Box,
  useMediaQuery,
  TextField,
  Fab,
  InputAdornment,
  Input,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface AuthenticationFormProps {
  isRegistration: boolean;
  APIstring: string;
}

// This component requires to be rendered on the client side
export default function AuthenticationForm({
  isRegistration,
  APIstring,
}: AuthenticationFormProps) {

  // State variables to save username, password and password visibility
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [transparentPass, setTransparentPass] = React.useState(false);

  // Our router
  const router = useRouter();

  // Based on props, we customize the text
  const ModalTitle = isRegistration ? "Registro" : "Iniciar sesión";
  const ActionButton = isRegistration ? "Registrarme" : "Ingresar";

  // We read the size of the media to readjust if necessary
  const isMobile = useMediaQuery("(max-width:600px)");

  // Handle username change
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  // Handle password change
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // Handle visibility
  const handleClickShowPassword = () => setTransparentPass((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // Handle back to landing page
  const handleToHome = () => {
    router.replace("/");
  };

  // Handle user registration to the application
  const handleRegistration = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        alert("Signed in!")
        router.replace("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  // Handle user login
  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("Signed in!")
        router.replace("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
  };

  return (
    <Paper
      id="mainauthpaper"
      elevation={12}
      sx={{
        width: isMobile ? "80%" : "500px",
        height: isMobile ? "50%" : "500px",
      }}
    >
      <Box sx={{ justifySelf: "start", marginLeft: 4, marginTop: 5 }}>
        <Fab onClick={handleToHome} variant="circular" size="small">
          <ArrowBackIcon />
        </Fab>
      </Box>
      <Box
        id="insideboxonpaper"
        sx={{
          marginLeft: 5,
          marginRight: 5,
          marginTop: 1,
          marginBotton: 5,
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: 2,
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h3"}
          sx={{ marginTop: 1, fontWeight: 200 }}
        >
          {ModalTitle}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexFlow: "column nowrap",
            gap: 2,
            width: "100%",
          }}
        >
          <TextField
            variant="standard"
            onChange={handleUsernameChange}
            size="medium"
            label="Nombre de usuario"
            placeholder="username@somewhere.xyz"
          />
          <FormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Contraseña
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={transparentPass ? "text" : "password"}
              placeholder="type something better than 123.."
              onChange = {handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {transparentPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box
            sx={{
                display: "flex",
                flexFlow: "row wrap",
                gap: 2,
                width: "100%",
                justifyContent: "center",
                marginTop: 3,
            }}
        >
            <Fab color="info" variant="extended" size="large" onClick={(event) => isRegistration ? handleRegistration(username, password) : handleLogin(username, password)}>
                {ActionButton}
            </Fab>
        </Box>
      </Box>
    </Paper>
  );
}

// <TextField variant = "standard" onChange = {handlePasswordChange} size = "medium" label = "Contraseña" type = "password" />
