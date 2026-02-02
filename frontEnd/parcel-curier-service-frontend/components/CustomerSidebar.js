"use client";

import Link from "next/link";
import LogoMain from "./LogoMain";
import LogOutCard from "./dashboard/LogOutCard";

export default function CustomerSidebar() {
  const navElements = [
    { title: "Dashboard", link: "/dashboard/customer", iconeLink: "" },
    { title: "Book Parcel", link: "/dashboard/customer/book", iconeLink: "" },
    { title: "My Parcels", link: "/dashboard/customer/parcels", iconeLink: "" },
    {
      title: "Live Tracking",
      link: "/dashboard/customer/tracking",
      iconeLink: "",
    },
    { title: "Payments", link: "/dashboard/customer/payments", iconeLink: "" },
    { title: "Profile", link: "/dashboard/customer/profile", iconeLink: "" },
    { title: "Reports", link: "/dashboard/customer/reports", iconeLink: "" },
  ];

  const navRender = navElements.map((element) => (
    <li key={element.title}>
      <Link
        href={element.link}
        className="block pr-4 py-3 rounded-xl text-sm md:text-xl font-medium hover:bg-white/10 transition"
      >
        {element.title}
      </Link>
    </li>
  ));

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
