import Navbar from "@/components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="fixed inset-0 bg-grid-primary/[0.02] -z-10" />
      <Navbar />
      <div className="flex-1 mt-9 container mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
