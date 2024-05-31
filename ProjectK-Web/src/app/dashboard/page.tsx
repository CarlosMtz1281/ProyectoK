"use client";
import React, {useState, useEffect}from 'react';
import { useRouter, usePathname } from "next/navigation";


export default function Dashboard() {
    const appRouter = useRouter();
    const [isAdminLocal, setIsAdminLocal] = useState<string>("");

    useEffect(() => {
        // setIsAdminLocal(getCookie("admin") || "");
        // if (isAdminLocal === 'true') {
        //     appRouter.replace("/dashboard/Admin/Explorar");
        // } else {
        //     appRouter.replace("/dashboard/Player/Explorar");
        // }

    }, []);

    return (
        <div className="flex flex-row p-11">
            <div>
                <h1>Loading</h1>
            </div>
        </div>
    );
}