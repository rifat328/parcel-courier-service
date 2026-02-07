"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoMain from "./LogoMain";
import LogOutCard from "./dashboard/LogOutCard";
import {
  House,
  Radio,
  UserPen,
  BookCheck,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaTruck } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
export default function CustomerSidebar() {
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
        className={`relative ${isActive ? "bg-[#1A1A1A]" : "currentColor"} rounded-2xl pl-4`}
      >
        <Link
          href={element.link}
          className={`
            flex items-center gap-4 pr-4 py-3 rounded-xl text-sm font-roboto md:text-lg font-medium  transition-all duration-300
            ${isActive ? "text-white " : "text-white/50 hover:text-white/70"}  
          `}
        >
          {/* Multiple layered glows for realistic effect */}
          {isActive && (
            <>
              {/* Main square light source */}
              <div className="absolute -left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#D94E4E]  blur-[1px] opacity-100" />

              {/* Secondary glow layer for more spread */}
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-8 h-6 bg-gradient-to-r  from-[#D94E4E]/80 via-[#D94E4E]/40 to-transparent blur-[4px]" />

              {/* Horizontal gradient overlay */}
              {/* <div className="absolute left-0 top-0 bottom-0 w-32 hover:bg-gradient-to-r from-[#D94E4E]/20 via-[#D94E4E]/10 to-transparent rounded-xl" /> */}
            </>
          )}

          {/* Icon */}
          {IconComponent && (
            <IconComponent
              className="w-5 h-5 md:w-7 md:h-7 relative z-10"
              style={{ color: isActive ? "#D94E4E" : "currentColor" }}
            />
          )}

          {/* Text */}
          <span className="relative z-10">{element.title}</span>
        </Link>
      </li>
    );
  });

  return (
    <div className="main_nav w-64 h-full flex flex-col text-white flex-shrink-0">
      {/* logo */}
      <div className="flex justify-center p-4 flex-shrink-0">
        <LogoMain size="5xl" />
      </div>

      {/* nav section - scrollable */}
      <nav className="bg-[#0D0D0D] text-white pt-4 flex-1 overflow-y-auto min-h-0">
        <ul className="space-y-2 pr-4">{navRender}</ul>
      </nav>

      {/* logout card - fixed at bottom */}
      <div className="flex-shrink-0 pr-5 py-4">
        <div className="rounded-2xl border border-white/10 transition duration-75 hover:shadow-xl hover:shadow-white/20">
          <LogOutCard userName="Rifat Hossain" userRole="Customer" />
        </div>
      </div>
    </div>
  );
}
