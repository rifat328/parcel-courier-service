"use client";
import React, { useState } from "react";
import Header from "./Header";
// Client Wrapper (often called a "Shell" or "UI Provider").
const DashboardUI = ({ SidebarComponent, children }) => {
  console.log("CHECKING DASHBOARD UI COMPONENTS:");
  console.log("Sidebar component:", typeof SidebarComponent);
  console.log("Sidebar Element Type:", SidebarComponent?.type);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#0D0D0D] pt-5 px-5 text-white overflow-hidden">
      {/* The Sidebar (Admin, Customer, or Agent) */}
      <SidebarComponent
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <Header isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardUI;
