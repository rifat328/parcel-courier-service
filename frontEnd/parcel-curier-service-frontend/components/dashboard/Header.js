"use client";
import React from "react";
import { useState } from "react";
import MobileToggle from "./MobileToggle";
const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-20 h-[80px] rounded-t-4xl background-mesh-style sm:flex justify-center items-center">
      <MobileToggle
        setIsMobileOpen={setIsMobileOpen}
        isMobileOpen={isMobileOpen}
      />
      <div className="flex h-full items-center px-5 justify-between">
        <input
          type="text"
          className="bg-[#0D0D0D] p-3 rounded-xl placeholder:text-white/80 text-xs focus:outline-2"
          placeholder="Search #Id"
        />
        <button className="bg-black rounded-2xl px-4 py-3">
          Create Parcel
        </button>
      </div>
    </header>
  );
};

export default Header;
