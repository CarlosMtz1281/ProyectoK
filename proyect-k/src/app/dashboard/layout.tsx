"use-client";
import React, { type ReactNode, Suspense, useState } from "react";
import NavbarConf from '../../components/NavbarConf/NavbarConf';

interface LayoutProps {
    children: ReactNode;
  }


const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col sm:flex-row h-screen">
            <NavbarConf />
            <main className="flex-1 bg-white p-5 overflow-hidden">{children}</main>
        </div>
    );
};

export default Layout;