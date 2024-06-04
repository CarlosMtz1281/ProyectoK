"use client";

import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  useMediaQuery,
  Fab,
  InputAdornment,
  Input,
  FormControl,
  InputLabel,
  IconButton,
  FormHelperText,
  Backdrop,
} from "@mui/material";
import { Visibility, VisibilityOff, EmailOutlined } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import app from "@/app/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import { SetCookieAPI } from "@/app/utils/setcookie";
import { getCookie } from "@/app/utils/getcookie";

const auth = getAuth(app);

export default function AuthenticationForm() {
  const api = process.env.NEXT_PUBLIC_API_URL;

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [transparentPass, setTransparentPass] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:600px)");

  const ModalTitle = "Iniciar sesión";
  const ActionButton = "Ingresar";

  async function userExists(email: string) {
    try {
      console.log(`${api}users/${email}`)
      const res = await axios.get(`${api}users/${email}`);
      // set the data in an object
      const userCookies = {
        email: res.data.user.user_email,
        admin: res.data.user.is_admin,
        userData: res.data.user,
        user_id: res.data.user.user_id,
        first_name: res.data.user.first_name,
        last_name: res.data.user.last_name,
        sessionKey: res.data.session.session_key,
      };
      // set just one cookie with all the data
      await SetCookieAPI("userCookies", JSON.stringify(userCookies));

    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  }

  const isValidEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setUsername(email);
    setUsernameError(!isValidEmail(email));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPassword(password);
    setPasswordError(password.length <= 5);
  };

  const handleClickShowPassword = () => setTransparentPass(!transparentPass);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleToHome = () => {
    router.replace("/");
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoginLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.email) {
        await userExists(user.email);
        const userCookies = await getCookie("userCookies");
        const userCookiesObj = JSON.parse(userCookies);
        const userEmail = userCookiesObj.email;
        if (userEmail === user.email) {
          console.log("Verification successful");
        } else {
          alert("Usuario no registrado. Por favor, regístrese");
          setIsLoginLoading(false);
          return;
        }
      }
      setIsLoginLoading(false);
      router.replace("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login. Please try again.");
      setIsLoginLoading(false);
    }
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
      <Backdrop
        open={isLoginLoading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 10 }}
      >
      </Backdrop>
      <Box
        id="insideboxonpaper"
        sx={{
          margin: 5,
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: isMobile ? 3 : 7,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Fab
            onClick={handleToHome}
            variant="circular"
            size="small"
            sx={{ marginRight: 1.5 }}
          >
            <ArrowBackIcon />
          </Fab>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontWeight: 200,
              marginRight: 6,
            }}
          >
            {ModalTitle}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexFlow: "column nowrap",
            gap: 2,
            width: "100%",
          }}
        >
          <FormControl error={usernameError} variant="standard">
            <InputLabel htmlFor="standard-adornment-email">
              Correo eléctronico
            </InputLabel>
            <Input
              id="standard-adornment-email"
              type="email"
              placeholder="username@somewhere.xyz"
              value={username}
              onChange={handleUsernameChange}
              endAdornment={
                <InputAdornment position="end" sx={{ mr: 1 }}>
                  <EmailOutlined />
                </InputAdornment>
              }
            />
            {usernameError && (
              <FormHelperText id="component-error-text">
                Correo inválido. Debe seguir este formato: tucuenta@dominio.algo
              </FormHelperText>
            )}
          </FormControl>

          <FormControl error={passwordError} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Contraseña
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={transparentPass ? "text" : "password"}
              placeholder="type something better than 123.."
              value={password}
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
            {passwordError && (
              <FormHelperText id="component-error-text">
                Contraseña inválida. Debe tener al menos 6 caracteres
              </FormHelperText>
            )}
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
            onClick={() => handleLogin(username, password)}
          >
            {ActionButton}
          </Fab>
        </Box>
      </Box>
    </Paper>
  );
}
