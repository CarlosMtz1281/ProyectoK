import React from "react";
import { Grid, Typography, Paper, Divider, Button } from "@mui/material";
import { TypeAnimation } from "react-type-animation";

export default function AIRecommendation() {
  return (
    <Grid item xs={6}>
      <Paper
        elevation={24}
        className="flex flex-row w-5/6 h-1/2 justify-center p-5 gap-5"
      >
        <div className="flex flex-col gap-5 w-1/3">
        <Typography >Solicita un análisis con IA</Typography>
        <Button variant = 'outlined'>Go</Button>
        </div>
        <Divider orientation="vertical" style={{ backgroundColor: "black" }} />
        <TypeAnimation
          className="w-2/3"
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "this are the results. womp womp. estudia más ",
          ]}
          wrapper="span"
          speed={50}
          repeat={0}
        />{" "}
      </Paper>
    </Grid>
  );
}
