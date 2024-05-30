"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter, usePathname } from "next/navigation";
import NavbarButton from "./NavbarButton";
import { CiLogout } from "react-icons/ci";
import { LuBrain } from "react-icons/lu";
import "../../styles/NavbarConf/NavbarConf.css";

export default function NavbarConf() {
  const appRouter = useRouter();

  const handleButtonClick = (nav: string) => {
    appRouter.replace(nav);
  };
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState('');
  const [path, setPath] = useState("Player");

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [initials, setInitials] = useState("");
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setUser(localStorage.getItem("admin") ?? '');
    setName(localStorage.getItem("first_name") ?? "");
    setLastName(localStorage.getItem("last_name") ?? "");
    setInitials(name.charAt(0) + lastName.charAt(0));
    setFlag(true);
    console.log(user);
    if (user === "true") {
      setAdmin(true);
      setPath("Admin");
    }
  }, []);

  function signOut() {
    if(flag){
      localStorage.removeItem("first_name");
      localStorage.removeItem("last_name");
    }
    appRouter.replace("/");
  }

  const pathname = usePathname();


  return (
    <div className="navbar">
      <div className="header">
        <div className="topHeader">
          <div className="Topic">
            <LuBrain size={40}/>

            <div >
              <h1 className="mainText">Ixpolin</h1>
            </div>
          </div>

          <div className="logo">
            <div>
              <p>{initials}</p>
            </div>
          </div>
          <h1>
            {name} {lastName}
          </h1>
        </div>
        {admin && <h2 className="subTittle">Administrador</h2>}
      </div>

      <div className="btnContainer">
        <NavbarButton
          icon={1}
          title="Explorar"
          nav={`/dashboard/${path}/Explorar`}
          active={pathname === `/dashboard/${path}/Explorar`}
          OnClick={() => handleButtonClick(`/dashboard/${path}/Explorar`)}
        />
        <NavbarButton
          icon={2}
          title="Mis Quizes"
          nav="/adminTemas"
          active={pathname === `/dashboard/${path}/MisQuizes`}
          OnClick={() => handleButtonClick(`/dashboard/${path}/MisQuizes`)}
        />
        <NavbarButton
          icon={3}
          title="Perfil"
          nav="/adminPreguntas"
          active={pathname === `/dashboard/${path}/Perfil`}
          OnClick={() => handleButtonClick(`/dashboard/${path}/Perfil`)}
        />
        <NavbarButton
          icon={4}
          title="Juego"
          nav="/adminGame"
          active={pathname === `/dashboard/${path}/Game`}
          OnClick={() => handleButtonClick(`/dashboard/${path}/Game`)}
        />
      </div>
      <div className="footer">
        <div className="footerText">
          <button
            onClick={signOut}
            style={{ display: "flex", alignItems: "center" }}
          >
            <CiLogout style={{ marginRight: "8px" }} />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
