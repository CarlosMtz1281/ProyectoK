import * as React from "react";
import { Grid, Typography, Box, Button, Paper } from "@mui/material";

export default function Home() {
  return (
    <div className="MainHTMLBody">
      <Box sx = {{alignSelf: "center", marginLeft: 10, marginRight: 5, gap: 5, display: "flex", flexDirection: "column", maxWidth: 400 }}>
        
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
            <Button size = "large" variant = "contained">Ingresar</Button>
          </Grid>

          <Grid item>
            <Button size = "large" variant = "outlined">Crear cuenta</Button>
          </Grid>

        </Grid>
      </Box>
    </div>
  );
}
