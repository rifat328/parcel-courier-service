"use client";
import React, { useState } from "react";
import Header from "./Header";
// Client Wrapper (often called a "Shell" or "UI Provider").
const DashboardUI = ({ sidebar, children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  //clone the sidebar component that has been passed down and pass the props
  const sidebarWithProps = React.cloneElement(sidebar, {
    isMobileOpen,
    setIsMobileOpen,
  });

  return (
    <div className="flex h-screen w-full bg-[#0D0D0D] pt-5 px-5 text-white overflow-hidden">
      {/* The Sidebar (Admin, Customer, or Agent) */}
      {sidebarWithProps}

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
