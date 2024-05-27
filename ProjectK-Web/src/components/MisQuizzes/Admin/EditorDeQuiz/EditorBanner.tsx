import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { FieldValues } from "react-hook-form";

export type EditorBannerProps = {
}

export default function EditorBanner({ }: EditorBannerProps) {

  return (
    <div className=" w-full h-32 flex gap-8 justify-start items-center mb-6">
      <Button variant="contained" color="info">
        <ArrowBack />
      </Button>
      <Typography variant="h4" className="font-thin">
        Editor de Quizzes
      </Typography>
      <Button type="submit" variant = 'outlined' className=" flex ml-auto">Save</Button>
    </div>
  );
}
