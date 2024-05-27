import React from "react";
import {
  Grid,
  Typography,
  Paper,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function ThemeSelection() {
  const [theme, setTheme] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setTheme(event.target.value);
  };
  return (
    <Grid item xs={2}>
      <Paper elevation={24} className="h-2/3 w-5/6 flex items-center p-6 gap-4">
        <Typography>Temas:</Typography>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel>tema</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={theme}
            label="seleccione un tema"
            onChange={handleChange}
            sx={{ width: "100%" }}
          >
            <MenuItem value={"Historia"}>Historia</MenuItem>
            <MenuItem value={"Papus"}>Papus</MenuItem>
            <MenuItem value={"Daniflou"}>Daniflou</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </Grid>
  );
}
