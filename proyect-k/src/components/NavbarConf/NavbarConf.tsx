'use client'

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import NavbarButton from "./NavbarButton"
import "../../styles/NavbarConf/NavbarConf.css";

export default function NavbarConf() {

    const appRouter = useRouter();

    const handleButtonClick = (nav: string) => {
        appRouter.replace(nav);
    }

    const pathname = usePathname();

    return(
        <div className="navbar">
            <div className="header"> Configuracion </div>
            <div className="flex flex-col items-center gap-y-4">
                <NavbarButton title="General" nav="/adminGeneral" active={pathname === "/adminGeneral"} OnClick={() => handleButtonClick("/adminGeneral")}/>
                <NavbarButton title="Temas" nav="/adminTemas" active={pathname === "/adminTemas"} OnClick={() => handleButtonClick("/adminTemas")} />
                <NavbarButton title="Preguntas" nav="/adminPreguntas" active={pathname === "/adminPreguntas"} OnClick={() => handleButtonClick("/adminPreguntas")}/>
            </div>
            <div className="flex flex-col h-full justify-end pb-16">
                <div>
                    <button>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
}