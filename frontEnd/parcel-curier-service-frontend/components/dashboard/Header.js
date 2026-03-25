"use client";
import React from "react";
import { Plus } from "lucide-react";
import MobileToggle from "./MobileToggle";
const Header = ({ isMobileOpen, setIsMobileOpen }) => {
  return (
    <header className="sticky top-0 z-20 h-[80px] rounded-t-4xl background-mesh-style flex items-center">
      <div className="flex w-full items-center px-5 justify-between">
        <div className="flex items-center gap-3">
          <MobileToggle
            setIsMobileOpen={setIsMobileOpen}
            isMobileOpen={isMobileOpen}
          />
          <input
            type="text"
            className="bg-[#0D0D0D] p-3 rounded-xl placeholder:text-white/80 text-xs focus:outline-2 focus:outline-[#D94E4E] transition-all w-40 md:w-64"
            placeholder="Search #Id"
          />
        </div>
        {/* create parcel button */}
        <div className=" p-[1.5px] rounded-2xl hover:bg-gradient-to-br from-[#4EC4D9]/80 via-[#DB9118]/80 to-[#D94E4E]/80">
          <button className="flex justify-center items-center gap-2 bg-black hover:bg-[#1A1A1A] text-white/80 hover:text-white rounded-[14px] px-4 py-3 sm:px-6 text-sm font-medium transition-colors min-w-fit ">
            <Plus size={16} className="shrink-0" />
            <span className="hidden sm:inline">Create Parcel</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
