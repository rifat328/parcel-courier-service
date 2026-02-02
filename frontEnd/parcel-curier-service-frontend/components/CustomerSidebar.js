"use client";

import Link from "next/link";
import LogoMain from "./LogoMain";
import LogOutCard from "./dashboard/LogOutCard";
export default function CustomerSidebar() {
  const navElements = [
    { title: "Dashboard", link: "", iconeLink: "" },
    { title: "Book Parcel", link: "", iconeLink: "" },
    { title: "My Parcels", link: "", iconeLink: "" },
    { title: "Live Tracking", link: "", iconeLink: "" },
    { title: "Payments", link: "", iconeLink: "" },
    { title: "Profile", link: "", iconeLink: "" },
    { title: "Reports", link: "", iconeLink: "" },
  ];

  const navRender = navElements.map((element) => (
    <li key={element.title}>
      <Link
        href={element.link}
        className="block pr-4 py-3 rounded-xl text-sm md:text-xl  font-medium hover:bg-white/10 transition"
      >
        {element.title}
      </Link>
    </li>
  ));

  return (
    <div className="main nav">
      <div className="flex justify-center p-4">
        <LogoMain size="5xl" />
      </div>

      <nav className="w-64 bg-[#0D0D0D] text-white py-4  ">
        <ul>{navRender}</ul>
        <LogOutCard userName="Rifat Hossain" userRole="Customer" />
      </nav>
    </div>
  );
}
