import React from "react";
import { Grid, Typography, Button, Fab } from "@mui/material";
import { ArrowBack, SaveAlt, DeleteOutline } from "@mui/icons-material";
import { FieldValues } from "react-hook-form";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";

export type EditorBannerProps = {};

export default function EditorBanner({}: EditorBannerProps) {
  return (
    <div className=" w-full h-32 flex gap-8 justify-between items-center mb-6">
      <div className="flex items-center gap-10">
        <Link href = '/dashboard/Admin/MisQuizes'>
        <Tooltip title="Go back" placement="top">
          <Fab color="default">
            <ArrowBack />
          </Fab>
        </Tooltip>
        </Link>
        <Typography variant="h4" className="font-thin">
          Editor de Quizzes
        </Typography>
      </div>
      <div className="flex items-center gap-5">
        <Tooltip title="Save Quiz" placement="top">
          <Fab type="submit" color="primary" className="flex ml-auto">
            <SaveAlt />
          </Fab>
        </Tooltip>
        <Tooltip title="Delete Quiz" placement="top">
          <Fab type="submit" color="error" className="flex ml-auto">
            <DeleteOutline />
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
}
