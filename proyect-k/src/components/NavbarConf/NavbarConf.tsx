"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import NavbarButton from "./NavbarButton";
import "../../styles/NavbarConf/NavbarConf.css";

export default function NavbarConf() {
  const appRouter = useRouter();

  const handleButtonClick = (nav: string) => {
    appRouter.replace(nav);
  };

  const pathname = usePathname();

  return (
    <div className="navbar">
      <div className="header">
        <div className="logo"/>
        <h1> WBAN Solutions</h1>
      </div>
      <div className="btnContainer">
        <NavbarButton
          icon={1}
          title="Explorar"
          nav="dashboard/Explorar"
          active={pathname === "/dashboard/Explorar"}
          OnClick={() => handleButtonClick("/dashboard/Explorar")}
        />
        <NavbarButton
          icon={2}
          title="Mis Quizes"
          nav="/adminTemas"
          active={pathname === "/adminTemas"}
          OnClick={() => handleButtonClick("/adminTemas")}
        />
        <NavbarButton
          icon={3}
          title="Perfil"
          nav="/adminPreguntas"
          active={pathname === "/adminPreguntas"}
          OnClick={() => handleButtonClick("/adminPreguntas")}
        />
      </div>
      <div className="footer">
        <div>
          <button>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
}
