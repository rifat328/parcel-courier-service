"use client";
import React from "react";
import { Plus, Bell } from "lucide-react";
import MobileToggle from "./MobileToggle";

const Header = ({ isMobileOpen, setIsMobileOpen }) => {
  return (
    <header className="sticky top-0 z-20 h-[80px] rounded-t-4xl background-mesh-style flex items-center">
      <div className="flex w-full items-center px-5 gap-4 justify-between">
        {/* Left Side: Toggle & Search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <MobileToggle
            setIsMobileOpen={setIsMobileOpen}
            isMobileOpen={isMobileOpen}
          />
          <div className="flex-1">
            <input
              type="text"
              className="w-full bg-[#0D0D0D] text-white p-3 rounded-xl placeholder:text-white/50 text-xs focus:ring-2 focus:ring-[#D94E4E] focus:outline-none transition-all"
              placeholder="Search #Id"
            />
          </div>
        </div>

        {/* Right Side: Notifications & Actions */}
        <div className="flex items-center gap-3">
          {/* Notification Icon */}
          <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors relative">
            <Bell size={20} />
            {/* Optional: Notification Dot */}
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#D94E4E] rounded-full border border-black"></span>
          </button>

          {/* Create Parcel Button */}
          <div className="p-[1.5px] rounded-2xl hover:bg-gradient-to-br from-[#4EC4D9]/80 via-[#DB9118]/80 to-[#D94E4E]/80">
            <button onClick={()=>} className="flex justify-center items-center gap-2 bg-black hover:bg-[#1A1A1A] text-white/80 hover:text-white rounded-[14px] px-4 py-3 sm:px-6 text-sm font-medium transition-colors min-w-fit ">
              <Plus size={16} className="shrink-0" />
              <span className="hidden sm:inline">Create Parcel</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
