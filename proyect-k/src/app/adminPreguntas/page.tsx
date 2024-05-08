
'use client'

import React from "react";
import { useRouter } from "next/navigation";
import NavbarConf from "../../components/NavbarConf/NavbarConf";

export default function vistaAdmin() {
    const router = useRouter();
    return (
        <div className="flex flex-row p-11">
            <NavbarConf />
            <div>
                Preguntas
            </div>
        </div>
    );
}