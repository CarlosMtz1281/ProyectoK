"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter, usePathname } from "next/navigation";
import NavbarButton from "./NavbarButton";
import "../../styles/NavbarConf/NavbarConf.css";

export default function NavbarConf() {
  const appRouter = useRouter();

  const handleButtonClick = (nav: string) => {
    appRouter.replace(nav);
  };
  const [admin, setAdmin] = useState(false);

  useEffect(() => {

    const user = localStorage.getItem("admin");
    console.log(user);
    if (user === "true") {
      setAdmin(true);
    }
  }, []);

  function signOut() {

    localStorage.removeItem("admin");
    localStorage.removeItem("email");
    appRouter.replace("/");

  }

  const pathname = usePathname();

  return (
    <div className="navbar">
      <div className="header">
        <div className="topHeader">
        <div className="logo"/>
        <h1> WBAN Solutions</h1>
        </div>
        {admin && <h2 className="subTittle">Administrador</h2>}
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
          active={pathname === "/dashboard/MisQuizes"}
          OnClick={() => handleButtonClick("/dashboard/MisQuizes")}
        />
        <NavbarButton
          icon={3}
          title="Perfil"
          nav="/adminPreguntas"
          active={pathname === "/dashboard/Perfil"}
          OnClick={() => handleButtonClick("/dashboard/Perfil")}
        />
      </div>
      <div className="footer">
        <div>
          <button onClick={signOut}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
}
