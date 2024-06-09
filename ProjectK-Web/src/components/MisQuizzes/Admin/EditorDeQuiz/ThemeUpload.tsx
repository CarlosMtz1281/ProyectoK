import React, { useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  TextField,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { FileUpload as UploadIcon, DrawOutlined } from "@mui/icons-material";
import "@/styles/Editor/Editor.css";
import axios from "axios";
import { getCookie } from "@/app/utils/getcookie";

export default function ThemeUpload() {
  const [open, setOpen] = useState(false);
  const [typedTheme, setTypedTheme] = useState("");
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: any) => {
    setTypedTheme(event.target.value);
  };

  const handleSubmit = async () => {
    if (typedTheme.length <= 0) {
      alert("Escribe algo!");
      return;
    }
    try {
      const userCookiesObj = JSON.parse(await getCookie("userCookies"));
      const session = userCookiesObj.sessionKey;
      const res = axios.post(
        apiURL + "quizes/topics/posting",
        { topic_name: typedTheme },
        { headers: { sessionKey: session } }
      );
      alert("El tema fue dado de alta exitosamente!")
      setOpen(false);
    } catch (error) {
      console.log(error);
      alert("No se pudo dar el tema de alta.");
    }
  };

  return (
    <Grid item xs={4}>
      <Paper
        elevation={24}
        className="h-full w-full flex items-center p-6  justify-between"
      >
        <div className="flex flex-row gap-1">
          <Typography>Crea tu propio</Typography>
          <Typography fontStyle={"italic"} fontWeight={"light"}>tema</Typography>
        </div>

        <button
          type="button"
          className="w-20 h-12 rounded-xl button-shiny"
          onClick={handleClickOpen}
        >
          <DrawOutlined />
        </button>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Agrega un tema</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nombre del tema"
              type="text"
              value={typedTheme}
              variant="standard"
              onChange={handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Confirmar</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Grid>
  );
}
