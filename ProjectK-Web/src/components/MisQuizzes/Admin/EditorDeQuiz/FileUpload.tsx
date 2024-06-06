import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { FileUpload as UploadIcon } from "@mui/icons-material"; // fileupload is imported as UploadIcon so it doesn't interfere with the function's name

export default function FileUpload() {
  return (
    <Grid item xs={3}>
      <Paper elevation={24} className="h-full w-full flex items-center p-6 gap-4">
        <button className="bg-gray-400 h-16 w-16 rounded-md">
            <UploadIcon />
        </button>
        <Typography className = 'w-1/4 text-wrap'>
            Imagen: Coming soon!
        </Typography>
      </Paper>
    </Grid>
  );
}
