"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter, usePathname } from "next/navigation";
import NavbarButton from "./NavbarButton";
import { CiLogout } from "react-icons/ci";
import { LuBrain } from "react-icons/lu";
import styles from "../../styles/NavbarConf/NavbarConf.module.css";
import { getCookie } from "@/app/utils/getcookie";
import { deleteCookie } from "@/app/utils/deletecookie";

export default function NavbarConf() {
  const appRouter = useRouter();

  const handleButtonClick = (nav: string) => {
    appRouter.replace(nav);
  };
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState("");
  const [path, setPath] = useState("Player");

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [initials, setInitials] = useState("");
  const [flag, setFlag] = useState(false);

  // We fetch cookies asynchronously
  const fetchData = async () => {
    const userCookie = await getCookie("admin");
    const firstName = await getCookie("first_name");
    const lastName = (await getCookie("last_name"));

    setUser(userCookie);
    setName(firstName);
    setLastName(lastName);
    setInitials(firstName.charAt(0) + lastName.charAt(0));
    setFlag(true);
    if (userCookie === "true") {
      setAdmin(true);
      setPath("Admin");
    }
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  async function signOut() {
    if (flag) {
      await deleteCookie("first_name");
      await deleteCookie("last_name");
      await deleteCookie("admin");
      await deleteCookie("email");
      await deleteCookie("userData");
      await deleteCookie("user_id");
    }
    appRouter.replace("/");
  }

  const pathname = usePathname();

  return (
    <div className={styles.navbar}>
      <div className={styles.header}>
        <div className={styles.topHeader}>
          <div className={styles.Topic}>
            <LuBrain size={40} />
            <h1 className={styles.mainText}>Ixpolin</h1>
          </div>

          <div className={styles.logo}>
            <p>{initials}</p>
          </div>
          <h1>
            {name} {lastName}
          </h1>
        </div>
        {admin ? (<h2>Administrador</h2>) : (<h2>Estudiante</h2>)}
      </div>

      <div className={styles.btnContainer}>
        {!admin ? (
        <NavbarButton
          icon={1}
          title="Explorar"
          nav={`/dashboard/${path}/Explorar`}
          href={`/dashboard/${path}/Explorar`}
          active={pathname === `/dashboard/${path}/Explorar`}
          OnClick={() => handleButtonClick(`/dashboard/${path}/Explorar`)}
        />
        ) : null}
        <NavbarButton
          icon={2}
          title="Mis Quizes"
          nav="/adminTemas"
          href={`/dashboard/${path}/MisQuizes`}
          active={pathname === `/dashboard/${path}/MisQuizes`}
          OnClick={() => handleButtonClick(`/dashboard/${path}/MisQuizes`)}
        />
        <NavbarButton
          icon={3}
          title="Perfil"
          nav="/adminPreguntas"
          href={`/dashboard/${path}/Perfil`}
          active={pathname === `/dashboard/${path}/Perfil`}
          OnClick={() => handleButtonClick(`/dashboard/${path}/Perfil`)}
        />
        <NavbarButton
          icon={4}
          title="Juego"
          nav="/adminGame"
          href={`/dashboard/${path}/Game`}
          active={pathname === `/dashboard/${path}/Game`}
          OnClick={() => handleButtonClick(`/dashboard/${path}/Game`)}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.footerText}>
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
