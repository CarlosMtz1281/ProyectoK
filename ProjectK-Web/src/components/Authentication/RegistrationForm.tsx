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
  FormHelperText,
  Select,
  MenuItem,
  SelectChangeEvent,
  Backdrop
} from "@mui/material";
import { Visibility, VisibilityOff, EmailOutlined } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import app from "@/app/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
// Cookies
import { SetCookieAPI } from "@/app/utils/setcookie";

const auth = getAuth(app);

// This component requires to be rendered on the client side
export default function RegistrationForm() {
  const api = process.env.NEXT_PUBLIC_API_URL;
  // State variables for user data
  const [dbUsername, setDbUsername] = React.useState("");
  const [trueName, setTrueName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [role, setRole] = React.useState("");

  // State variables to save username, password and password visibility
  const [username, setUsername] = React.useState("");
  const [usernameError, setUsernameError] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [transparentPass, setTransparentPass] = React.useState(false); // This helps toggle visibility on password
  const [isLoginLoading, setIsLoginLoading] = React.useState(false);

  // Our router
  const router = useRouter();

  // We read the size of the media to readjust if necessary
  const isMobile = useMediaQuery("(max-width:600px)");

  //register User on DB
  async function createUser(email: string) {
    console.log("Creating user on DB");
    let admin = false;
    if (role === "Administrador") {
      admin = true;
    }
    const userData = {
      username: dbUsername,
      email: email,
      firstName: trueName,
      lastName: lastName,
      isAdmin: admin,
    };

    await axios
      .post(api + `users/`, userData)
      .then(async (res) => {
        console.log("success");
        console.log(res);
        await SetCookieAPI("email", email);
        await SetCookieAPI("admin", admin.toString());
        await SetCookieAPI("userData", JSON.stringify(userData));
        await SetCookieAPI("user_id", res.data.user.user_id.toString());
        await SetCookieAPI("first_name", trueName);
        await SetCookieAPI("last_name", lastName);
      })
      .catch((err) => {
        console.log(err);
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
      setPassword(event.target.value);
      setPasswordError(false);
      return;
    }
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
    setIsLoginLoading(true);
    if (usernameError || passwordError) {
      alert("Correo o contraseña inválidos. Escríbalos correctamente");
      setIsLoginLoading(false);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        if (user.email) {
          createUser(user.email);
        }
        setIsLoginLoading(false);
        router.replace("/dashboard");
      })
      .catch((error) => {
        setIsLoginLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  // Handle role change
  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  return (
    <Paper
      id="mainauthpaper"
      elevation={12}
      sx={{
        width: isMobile ? "90%" : "500px",
        height: isMobile ? "70%" : "640px",
      }}
    >
      {/* I'm going to add the backdrop right here .. */}
      <Backdrop
        open={isLoginLoading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 10 }}
      >
      </Backdrop>
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
          gap: isMobile ? 3 : 6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: 0,
            marginTop: 5,
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
            variant={isMobile ? "h4" : "h3"}
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontWeight: 200,
              marginRight: 6,
            }}
          >
            Registro
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
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            gap={2}
            sx={{ width: "100%" }}
          >
            <TextField
              sx={{ width: "100%" }}
              variant="standard"
              label="Nombre"
              placeholder="Juan"
              onChange={(e) => setTrueName(e.target.value)}
            />

            <TextField
              sx={{ width: "100%" }}
              variant="standard"
              label="Apellidos"
              placeholder="Gónzalez Gónzalez"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
          <Box>
            <TextField
              sx={{ width: "100%" }}
              variant="standard"
              label="Nombre de usuario"
              placeholder="JuanGonzalez123"
              onChange={(e) => setDbUsername(e.target.value)}
            />
          </Box>

          <FormControl error={usernameError} variant="standard">
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
                Contraseña inválida. Debe tener al menos 6 carácteres
              </FormHelperText>
            )}
          </FormControl>
        </Box>

        <Box
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            gap: 5,
          }}
        >
          <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
            Selecciona un rol
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="selecta role">Rol</InputLabel>
            <Select
              labelId="selectrole"
              id="simple-select"
              value={role}
              label="Rol de la cuenta"
              onChange={handleChange}
            >
              <MenuItem value={"Estudiante"}>Estudiante</MenuItem>
              <MenuItem value={"Administrador"}>Administrador</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            gap: 2,
            width: "100%",
            justifyContent: "center",
            marginTop: 0,
            marginBottom: 3,
          }}
        >
          <Fab
            variant="extended"
            size="large"
            disabled={usernameError || passwordError}
            color="info"
            onClick={(event) => handleRegistration(username, password)}
          >
            Registrarme
          </Fab>
        </Box>
      </Box>
    </Paper>
  );
}
