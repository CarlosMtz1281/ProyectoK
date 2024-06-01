"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCookie } from "../utils/getcookie";
import { Backdrop } from "@mui/material";
import { hatch } from "ldrs";

export default function Dashboard() {
  const appRouter = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

  async function checkAdmin() {
    const isAdminLocal = await getCookie("admin");
    if (isAdminLocal === "true") {
      setIsLoading(false);
      appRouter.replace("/dashboard/Admin/Explorar");
    } else {
      setIsLoading(false);
      appRouter.replace("/dashboard/Player/Explorar");
    }
  }
  hatch.register();
  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <div className="flex">
      {/* I'm going to add the backdrop right here .. */}
      <Backdrop
        open={isLoading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 10 }}
      >
        <l-hatch size="52" stroke="10" speed="3.5" color="white"></l-hatch>
      </Backdrop>
    </div>
  );
}
