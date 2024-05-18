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
  FormHelperText
} from "@mui/material";
import { Visibility, VisibilityOff, EmailOutlined } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import app from "@/app/firebase";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";

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
  const [usernameError, setUsernameError] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [transparentPass, setTransparentPass] = React.useState(false); // This helps toggle visibility on password

  // Our router
  const router = useRouter();

  // Based on props, we customize the text
  const ModalTitle = isRegistration ? "Registro" : "Iniciar sesión";
  const ActionButton = isRegistration ? "Registrarme" : "Ingresar";

  // We read the size of the media to readjust if necessary
  const isMobile = useMediaQuery("(max-width:600px)");

  // CONECTION API
  function userExists(email: string) {
    axios
      .get(`http://localhost:2024/users/${email}`)
      .then((res) => {
        console.log(res);
        console.log(res.data[0].email);
        localStorage.setItem('email', res.data.user.email);


      })
      .catch((err) => {
        console.log(err);
        localStorage.setItem('email', 'NOT FOUND');


      });

  }

  function createUser(email: string) {
    axios
      .post(`http://localhost:2024/users/`)
      .then((res) => {
        console.log(res);
        localStorage.setItem('email', res.data.user.email);

      }
      )
      .catch((err) => {
        console.log(err);
        localStorage.setItem('email', 'NOT FOUND');

      });

  }


  // Method to check if the email is valid
  const isValidEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Handle username change
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isValidEmail(event.target.value)) {
      setUsername(event.target.value);
      setUsernameError(false);
      return;
    }
    setUsernameError(true);
  };

  // Handle password change
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 5) {
        setPassword(event.target.value)
        setPasswordError(false);
        return;
    };
    setPasswordError(true);
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
    if (usernameError || passwordError) {
        alert("Correo o contraseña inválidos. Escríbalos correctamente");
        return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        if (user.email) {
          createUser(user.email);
        }

        alert("Signed in!");
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

        if (user.email) {
          userExists(user.email);
          if(localStorage.getItem('email') === user.email){
            alert("Bienvenido! ");

          } else {
            alert("Usuario no registrado. Por favor, regístrese");
            return;
          }
        }

        router.replace("/dashboard");
        console.log(user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
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
          <FormControl error = {usernameError} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Correo eléctronico
            </InputLabel>
            <Input
              id="standard-userinput"
              type="email"
              placeholder="username@somewhere.xyz"
              onChange={handleUsernameChange}
              endAdornment={
                <InputAdornment position="end" sx={{ mr: 1 }}>
                  <EmailOutlined />
                </InputAdornment>
              }
            />
            { usernameError && <FormHelperText id="component-error-text">Correo inválido. Debe seguir este formato: tucuenta@dominio.algo</FormHelperText> }
          </FormControl>

          <FormControl error = {passwordError} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Contraseña
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={transparentPass ? "text" : "password"}
              placeholder="type something better than 123.."
              onChange={handlePasswordChange}
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
            { passwordError && <FormHelperText id="component-error-text">Contraseña inválida. Debe tener al menos 6 carácteres</FormHelperText> }
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
          <Fab
            color="info"
            variant="extended"
            size="large"
            onClick={(event) =>
              isRegistration
                ? handleRegistration(username, password)
                : handleLogin(username, password)
            }
          >
            {ActionButton}
          </Fab>
        </Box>
      </Box>
    </Paper>
  );
}

// <TextField variant = "standard" onChange = {handlePasswordChange} size = "medium" label = "Contraseña" type = "password" />
