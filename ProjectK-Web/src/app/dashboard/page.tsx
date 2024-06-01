"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCookie } from "../utils/getcookie";

export default function Dashboard() {
  const appRouter = useRouter();
  async function checkAdmin() {
    const isAdminLocal = await getCookie("admin");
    if (isAdminLocal === "true") {
      appRouter.replace("/dashboard/Admin/Explorar");
    } else {
      appRouter.replace("/dashboard/Player/Explorar");
    }
  }
  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <div className="flex flex-row p-11">
      <div>
        <h1>Loading</h1>
      </div>
    </div>
  );
}
