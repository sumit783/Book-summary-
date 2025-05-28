import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";


const Footer = () => (
  <footer className="w-full bg-background border-t border-border px-6 py-4 text-center text-sm text-muted-foreground mt-8">
    © {new Date().getFullYear()} Book Summary. All rights reserved.
  </footer>
);

const Layout: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-black text-white">
    <NavBar />
    <main className="flex-1 container min-h-screen mx-auto px-4 py-8">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;