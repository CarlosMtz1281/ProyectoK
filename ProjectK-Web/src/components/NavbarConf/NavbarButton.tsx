"use client";

import React from "react";
import "../../styles/NavbarConf/NavbarButton.css";
import { MdExplore } from "react-icons/md";
import { FaBookBookmark } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoPersonSharp } from "react-icons/io5";
import { SiStarship } from "react-icons/si";



import { usePathname } from "next/navigation";

export default function NavbarButton({
  title,
  nav,
  active,
  OnClick,
  icon,
}: {
  title: string;
  nav: string;
  active: boolean;
  icon: number;
  OnClick: () => void;
}) {
  return (
    <button className={"button"} onClick={OnClick}>
      <div className={`container ${active ? "container-selected" : ""}`}>
        <div className={`icon ${active ? "icon-selected" : ""}`}>
          {icon === 1 ? (
            <MdExplore size={30} />
          ) : icon === 2 ? (
            <FaBookBookmark size={30} />
          ) : icon === 3 ? (
            <IoPersonSharp size={30}/>
          ): icon ===4 ? (
            <SiStarship size={30}/>
          ):null}{" "}

        </div>
        <div className={`text ${active ? "text-selected" : ""}`}>{title}</div>
      </div>
    </button>
  );
}
