"use client";

import React from "react";
import "@/styles/Authentication.css";
import {
  Paper,
  Typography,
  useMediaQuery,
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  Fab,
} from "@mui/material";
import app from "@/app/firebase";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
} from "firebase/firestore";

export default function RolePage() {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [role, setRole] = React.useState<string>("vacío");

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handleSubmit = async () => {
    const db = getFirestore(app);
    const docRef = collection(db, "roles"); // replace with your collection name

    await addDoc(docRef, { role: role });
  };

  return (
    <div className="AuthenticationBody">
      <Paper
        sx={{
          width: isMobile ? "70%" : "40%",
          height: "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography>Selecciona un rol</Typography>
        <div style={{ display: "flex", flexGrow: "row wrap", width: "70%" }}>
          <FormControl fullWidth>
            <InputLabel id="selecta role">Rol de la cuenta</InputLabel>
            <Select
              labelId="selectrole"
              id="simple-select"
              value={role}
              label="Rol de la cuenta"
              onChange={handleChange}
            >
              <MenuItem value={10}>Estudiante</MenuItem>
              <MenuItem value={20}>Administrador</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Fab
          color="info"
          variant="extended"
          disabled={role !== "vacío" ? false : true}
        >
          Guardar
        </Fab>
      </Paper>
    </div>
  );
}
