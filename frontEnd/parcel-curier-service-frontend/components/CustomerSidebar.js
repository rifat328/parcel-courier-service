"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LogoMain from "./LogoMain";
import LogOutCard from "./dashboard/LogOutCard";
import {
  House,
  Radio,
  UserPen,
  BookCheck,
  PanelRightClose,
  PanelRightOpen,
  Menu,
  X,
} from "lucide-react";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaTruck } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";

export default function CustomerSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navElements = [
    { title: "Dashboard", link: "/dashboard/customer", iconeLink: House },
    {
      title: "Book Parcel",
      link: "/dashboard/customer/book",
      iconeLink: FaBoxOpen,
    },
    {
      title: "My Parcels",
      link: "/dashboard/customer/parcels",
      iconeLink: FaTruck,
    },
    {
      title: "Live Tracking",
      link: "/dashboard/customer/tracking",
      iconeLink: Radio,
    },
    {
      title: "Payments",
      link: "/dashboard/customer/payments",
      iconeLink: RiMoneyDollarBoxFill,
    },
    {
      title: "Profile",
      link: "/dashboard/customer/profile",
      iconeLink: UserPen,
    },
    {
      title: "Reports",
      link: "/dashboard/customer/reports",
      iconeLink: BookCheck,
    },
  ];

  const navRender = navElements.map((element) => {
    const isActive = pathname === element.link;
    const IconComponent = element.iconeLink;

    return (
      <li
        key={element.title}
        className={`relative ${isActive ? "bg-[#1A1A1A]" : "currentColor"} rounded-2xl lg:pl-4 hover:bg-[#1A1A1A]`}
      >
        <Link
          href={element.link}
          onClick={() => setIsMobileOpen(false)}
          className={`
            flex items-center md:justify-center lg:justify-start gap-4 px-4 lg:pr-4 py-3 rounded-xl text-sm font-roboto md:text-lg font-medium transition-all duration-300
            ${isActive ? "text-white" : "text-white/50 hover:text-white/70"}
          `}
        >
          {/* Multiple layered glows for realistic effect */}
          {isActive && (
            <>
              {/* Main square light source */}
              <div className="absolute -left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#D94E4E] blur-[1px] opacity-100" />

              {/* Secondary glow layer for more spread */}
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-8 h-6 bg-gradient-to-r from-[#D94E4E]/80 via-[#D94E4E]/40 to-transparent blur-[4px]" />
            </>
          )}

          {/* Icon */}
          {IconComponent && (
            <IconComponent
              className="w-5 h-5 md:w-7 md:h-7 relative z-10"
              style={{ color: isActive ? "#D94E4E" : "currentColor" }}
            />
          )}

          {/* Text - hidden on tablet, visible on mobile (when open) and laptop+ */}
          <span className="relative z-10 md:hidden lg:block">
            {element.title}
          </span>
        </Link>
      </li>
    );
  });

  return (
    <>
      {/* Mobile Toggle Button - only show on mobile, hide on tablet+ */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#1A1A1A] rounded-lg text-white"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile only */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          main_nav h-full flex flex-col text-white flex-shrink-0 bg-[#0D0D0D] z-40
          transition-all duration-300
          
          ${/* Position: fixed on mobile only, relative on tablet+ */ ""}
          fixed md:relative
          
          ${/* Transform: slide on mobile only, always visible on tablet+ */ ""}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          
          ${/* Width: full on mobile when open, icon-only on tablet, full on laptop+ */ ""}
          ${isMobileOpen ? "w-64" : "w-0"} md:w-20 lg:w-64
        `}
      >
        {/* logo */}
        <div className="flex justify-center p-4 flex-shrink-0">
          <LogoMain size="5xl" className="hidden lg:block" />
        </div>

        {/* nav section - scrollable */}
        <nav className="text-white pt-4 flex-1 overflow-y-auto min-h-0">
          <ul className="space-y-2 pr-4">{navRender}</ul>
        </nav>

        {/* logout card - fixed at bottom - hide on tablet icon-only view */}
        <div className="flex-shrink-0 pr-5 py-4 hidden lg:block">
          <div className="rounded-2xl border border-white/10 transition duration-75 hover:shadow-xl hover:shadow-white/20">
            <LogOutCard userName="Rifat Hossain" userRole="Customer" />
          </div>
        </div>
      </div>
    </>
  );
}
