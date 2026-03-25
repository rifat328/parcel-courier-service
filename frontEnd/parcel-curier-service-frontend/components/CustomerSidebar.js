"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoMain from "./LogoMain";
import LogOutCard from "./dashboard/LogOutCard";
import { House, Radio, UserPen, BookCheck } from "lucide-react";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaTruck } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";

export default function CustomerSidebar({ isMobileOpen, setIsMobileOpen }) {
  const pathname = usePathname();

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
            flex items-center md:justify-center lg:justify-start gap-4 px-4 md:px-0 lg:px-4 lg:pr-4 py-3 rounded-xl text-sm font-roboto md:text-lg font-medium transition-all duration-300
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

          {/* Text - hidden on tablet, visible on mobile (when open) and laptop++ */}
          <span className="relative z-10 md:hidden lg:block">
            {element.title}
          </span>
        </Link>
      </li>
    );
  });

  return (
    <>
      {/* Sidebar */}
      <div
        className={`
          main_nav h-full flex flex-col text-white flex-shrink-0 bg-[#0D0D0D] 
          transition-all duration-300 overflow-x-hidden z-40
          
          ${/* Position: fixed on mobile only, relative on tablet+ */ ""}
          fixed md:relative 
          
          ${/* Transform: slide on mobile only, always visible on tablet+ */ ""}
          ${isMobileOpen ? "translate-x-0 w-50" : "-translate-x-full"} md:translate-x-0
          
          ${/* Width: full on mobile when open, icon-only on tablet, full on laptop+ */ ""}
            md:w-20 lg:w-64  md:outline-1 md:outline-white/20 lg:outline-none md:rounded-2xl lg:rounded-none
        `}
      >
        {/* logo */}
        <div className="flex justify-center p-4 flex-shrink-0">
          <div className="  md:hidden">
            <LogoMain size="3xl" />
          </div>

          <div className=" hidden md:block lg:hidden">
            <LogoMain size="xl" />
          </div>

          <div className="hidden lg:block">
            <LogoMain size="5xl" />
          </div>
        </div>

        {/* nav section - scrollable */}
        <nav className="text-white pt-4 flex-1 overflow-y-auto min-h-0 custom-scrollbar px-4 md:px-1 lg:px-4">
          <ul className="space-y-2 pr-4 md:pr-0 lg:pr-4">{navRender}</ul>
        </nav>

        {/* logout card - fixed at bottom - hide on tablet icon-only view */}
        <div className="rounded-2xl flex-shrink-0 pb-4 mb-1 mt-auto border-t border-white/5  transition duration-75 ">
          <LogOutCard userName="Rifat Hossain" userRole="Customer" />
        </div>
      </div>
    </>
  );
}
