"use client";
import React, {use, useEffect}from 'react';
import NavbarConf from '../../components/NavbarConf/NavbarConf';
import { useRouter, usePathname } from "next/navigation";


export default function Dashboard() {
    const appRouter = useRouter();

    useEffect(() => {
        appRouter.replace("/dashboard/Explorar");

    }, []);

    return (
        <div className="flex flex-row p-11">
            <div>
                <h1>Loading</h1>
            </div>
        </div>
    );
}