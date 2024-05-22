"use-client";
import React, { type ReactNode, Suspense, useState } from "react";
import NavbarConf from '../../components/NavbarConf/NavbarConf';
import "../../styles/DashboardLayout.css"

interface LayoutProps {
    children: ReactNode;
  }


const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col sm:flex-row h-screen">
            <NavbarConf />
            <main className="layout-content">{children}</main>
        </div>
    );
};

export default Layout;