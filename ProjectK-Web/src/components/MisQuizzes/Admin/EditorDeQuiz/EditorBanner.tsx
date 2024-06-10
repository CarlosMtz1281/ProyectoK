"use client";

import React from "react";
import {
  Grid,
  Typography,
  Button,
  Fab,
  Menu,
  MenuList,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ArrowBack,
  SaveAlt,
  DeleteOutline,
  Add,
  MoreVert,
} from "@mui/icons-material";
import { FieldValues } from "react-hook-form";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type EditorBannerProps = {};

export default function EditorBanner({}: EditorBannerProps) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBackwards = async () => {
    router.replace("/dashboard/Admin/MisQuizes");
  };

  return (
    <div className=" w-full h-32 flex gap-8 justify-between items-center mb-6">
      <div className="flex items-center gap-10">
        <Tooltip title="Go back" placement="top">
          <Fab color="default" onClick={handleBackwards} sx={{ zIndex: 0 }}>
            <ArrowBack />
          </Fab>
        </Tooltip>
        <Typography variant="h4" className="font-thin">
          Editor de Quizzes
        </Typography>
      </div>
      <div className="flex items-center gap-5">
        <Tooltip title="Save Quiz" placement="top">
          <Fab variant = "extended" type="submit" color="primary" className="flex ml-auto items-center gap-3 justify-around">
            
            <SaveAlt />
            Save
          </Fab>
        </Tooltip>
        <Tooltip title="Delete Quiz" placement="top">
          <Fab variant = "extended" color="error" className="flex ml-auto items-center gap-3 justify-around">
            <DeleteOutline />
            Delete
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
}
