'use client'

import React from 'react';
import "../../styles/NavbarConf/NavbarButton.css"
import { usePathname } from 'next/navigation';

export default function NavbarButton({ title, nav, active, OnClick }: { title: string, nav: string, active:boolean, OnClick:() => void }) {

    return (
        <button className={'button'} onClick={OnClick}>
            <div className="container">
                <div className={`square ${active ? 'square-selected' : ''}`} />
                <div className={`text ${active ? 'text-selected' : ''}`}>{title}</div>
            </div>
        </button>
    );
}
