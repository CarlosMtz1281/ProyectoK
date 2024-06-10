"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "../utils/getcookie";
import { Backdrop, CircularProgress } from "@mui/material";

export default function Dashboard() {
  const appRouter = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  async function checkAdmin() {
    const userCookiesObj = JSON.parse(await getCookie("userCookies"));
    const isAdminLocal = userCookiesObj.admin;
    if (isAdminLocal) {
      setIsLoading(false);
      appRouter.replace("/dashboard/Admin/MisQuizes");
    } else {
      setIsLoading(false);
      appRouter.replace("/dashboard/Player/Explorar");
    }
  }

  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <div className="flex">
      <Backdrop
        open={isLoading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 10 }}
      >
        <CircularProgress />
      </Backdrop>
    </div>
  );
}
