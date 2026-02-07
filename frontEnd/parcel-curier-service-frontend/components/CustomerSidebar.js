"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoMain from "./LogoMain";
import LogOutCard from "./dashboard/LogOutCard";
import { House } from "lucide-react";
export default function CustomerSidebar() {
  const pathname = usePathname();

  const navElements = [
    { title: "Dashboard", link: "/dashboard/customer", iconeLink: House },
    { title: "Book Parcel", link: "/dashboard/customer/book", iconeLink: "" },
    { title: "My Parcels", link: "/dashboard/customer/parcels", iconeLink: "" },
    {
      title: "Live Tracking",
      link: "/dashboard/customer/tracking",
      iconeLink: "",
    },
    {
      title: "Payments",
      link: "/dashboard/customer/payments",
      iconeLink: "",
    },
    { title: "Profile", link: "/dashboard/customer/profile", iconeLink: "" },
    { title: "Reports", link: "/dashboard/customer/reports", iconeLink: "" },
  ];

  const navRender = navElements.map((element) => {
    const isActive = pathname === element.link;
    const IconComponent = element.iconeLink;
    //#D94E4E
    return (
      <li key={element.title} className="flex  gap-4 items-center ">
        {IconComponent && (
          <IconComponent
            className="w-5 h-5 md:w-7 md:h-7"
            style={{ color: isActive ? "#D94E4E" : "currentColor" }}
          />
        )}
        <Link
          href={element.link}
          className={`
            block pr-4 py-2 rounded-xl text-sm font-roboto md:text-lg font-medium transition 
            ${
              isActive
                ? "bg-gradient-to-r from-red-500/20 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.3)] text-white"
                : "text-white/50 hover:bg-white/10"
            }
          `}
        >
          {element.title}
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
        <ul className="space-y-2 px-4">{navRender}</ul>
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
