"use client";

import React from "react";
import "../../styles/NavbarConf/NavbarButton.css";
import { MdOutlineExplore } from "react-icons/md";
import { MdOutlineQuiz } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CiCircleQuestion } from "react-icons/ci";


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
            <MdOutlineExplore size={30} />
          ) : icon === 2 ? (
            <MdOutlineQuiz size={30} />
          ) : icon === 3 ? (
            <CgProfile size={30}/>
          ): null}{" "}

        </div>
        <div className={`text ${active ? "text-selected" : ""}`}>{title}</div>
      </div>
    </button>
  );
}
