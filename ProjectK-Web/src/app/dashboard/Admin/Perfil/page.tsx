'use client'
import React from "react";
import { Card, CardContent, Typography, Paper, Avatar } from "@mui/material";
import { getCookie } from "@/app/utils/getcookie";

export default function Profile() {
  const [firstName, setFirstName] = React.useState("loading..");
  const [lastName, setLastName] = React.useState("loading...");
  const [isAdmin, setIsAdmin] = React.useState("no creo ja");

  const cookiegetter = async () => {
    const firstname = await getCookie("first_name");
    const lastname = await getCookie("last_name");
    const isadmin = await getCookie("admin");

    setFirstName(firstname);
    setLastName(lastname);
    setIsAdmin(isAdmin);
  };

  React.useEffect(() => {
    cookiegetter();
  }, []);

  return (
    <div className="flex h-full w-full justify-center items-center">
      <Paper
        elevation={24}
        className="h-3/4 w-1/2 flex justify-center items-center flex-col gap-7"
      >
        <Avatar className="h-32 w-32" />
        <Typography variant="h5">
        {lastName} , {firstName}
        </Typography>
        <Typography variant = 'h5'>
            Rol: {isAdmin ? "Administrador" : "Estudiante"}
        </Typography>
      </Paper>
    </div>
  );
}
