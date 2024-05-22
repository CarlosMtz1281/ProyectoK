"use client";
import React, {use, useEffect}from 'react';
import { useRouter, usePathname } from "next/navigation";


export default function Dashboard() {
    const appRouter = useRouter();

    useEffect(() => {
        if (localStorage.getItem('admin') === 'true') {
            appRouter.replace("/dashboard/Admin/Explorar");
        } else {
            appRouter.replace("/dashboard/Player/Explorar");
        }

    }, []);

    return (
        <div className="flex flex-row p-11">
            <div>
                <h1>Loading</h1>
            </div>
        </div>
    );
}