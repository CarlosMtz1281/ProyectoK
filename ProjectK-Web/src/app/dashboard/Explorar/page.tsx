"use client";
import React, {useState, useEffect}from 'react';
import { useRouter, usePathname } from "next/navigation";
import { getCookie } from "@/app/utils/getcookie";

// For some reason, when the user tries to go back through the browser
// It goes into dashboard/Explorar, when it shouldn't.
// This is simply to patch it.

// THIS IS JUST A PATCH

export default function ExplorarFix() {
    const appRouter = useRouter();
  async function checkAdmin() {
    const userCookies = await getCookie("userCookies");
    const userCookiesObj = JSON.parse(userCookies);
    const isAdminLocal = userCookiesObj.admin;
    if (isAdminLocal) {
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