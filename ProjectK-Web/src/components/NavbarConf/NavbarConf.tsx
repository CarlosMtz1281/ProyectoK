"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter, usePathname } from "next/navigation";
import NavbarButton from "./NavbarButton";
import { CiLogout } from "react-icons/ci";
import { LuBrain } from "react-icons/lu";
import { IoIosMenu } from "react-icons/io";
import styles from "@/styles/NavbarConf/NavbarConf.module.css";
import { getCookie } from "@/app/utils/getcookie";
import { deleteCookie } from "@/app/utils/deletecookie";

type UserCookies = {
  email: string;
  admin: boolean;
  userData: string;
  user_id: string;
  first_name: string;
  last_name: string;
  sessionKey: string;
};

export default function NavbarConf() {
  const appRouter = useRouter();

  const [path, setPath] = useState("Player");
  const [userCookies, setUserCookies] = useState<UserCookies>();
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    const userCookiesObj = JSON.parse(await getCookie("userCookies"));
    setUserCookies(userCookiesObj);
    setFlag(true);
    console.log(userCookies);
    if (userCookiesObj.admin) {
      console.log("this user is admin");
      setPath("Admin");
    }
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, [admin]);

  async function signOut() {
    if (flag) {
      await deleteCookie("userCookies");
    }
    appRouter.replace("/");
  }

  const pathname = usePathname();

  return (
    <>
      <div className={`${styles.navbar} ${open ? styles.navbarActive : ""}`}>
        <div className={styles.header}>
          <div className={styles.topHeader}>
            <div className={styles.Topic}>
              <LuBrain size={40} />
              <h1 className={styles.mainText}>Ixpolin</h1>
            </div>

            <div className={styles.logo}>
              <p>{userCookies?.first_name.charAt(0)}{userCookies?.last_name.charAt(0)}</p>
            </div>
            <h1>
              {userCookies?.first_name} {userCookies?.last_name}
            </h1>
          </div>
          {userCookies?.admin ? (<h2>Administrador</h2>) : (<h2>Estudiante</h2>)}
        </div>

        <div className={styles.btnContainer}>
          {!userCookies?.admin ? (
          <NavbarButton
            icon={1}
            title="Explorar"
            nav={`/dashboard/${path}/Explorar`}
            href={`/dashboard/${path}/Explorar`}
            active={pathname === `/dashboard/${path}/Explorar`}
          />
          ) : null}
          <NavbarButton
            icon={2}
            title="Mis Quizes"
            nav="/adminTemas"
            href={`/dashboard/${path}/MisQuizes`}
            active={pathname === `/dashboard/${path}/MisQuizes`}
          />
          <NavbarButton
            icon={3}
            title="Perfil"
            nav="/adminPreguntas"
            href={`/dashboard/${path}/Perfil`}
            active={pathname === `/dashboard/${path}/Perfil`}
          />
          <NavbarButton
            icon={4}
            title="Juego"
            nav="/adminGame"
            href={`/dashboard/${path}/Game`}
            active={pathname === `/dashboard/${path}/Game`}
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
      <div className={styles.mobileNavbar}>
        <IoIosMenu style={{marginLeft: "1.5rem"}} size={30} onClick={() => setOpen(!open)} />
      </div>
    </>
  );
}
