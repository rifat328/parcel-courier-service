"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut as LogOutIcon } from "lucide-react";
const LogOutCard = (props) => {
  const router = useRouter();

  const logOut = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_SIGN_OUT_ROUTE}`,
      {
        method: "POST",
        credentials: "include",
      },
    );
    router.push("/sign-in");
  };

  return (
    <div className=" flex items-center justify-between md:justify-center lg:justify-start gap-3 bg-[#1A1A1A] md:bg-transparent lg:bg-[#1A1A1A] p-2 lg:p-3 rounded-2xl transition-all duration-300  hover:shadow-xl hover:shadow-white/20">
      {/* Profile Image - Clickable */}
      <div
        className="log_out relative flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border-2 border-transparent hover:border-[#D94E4E] transition-all md:hidden lg:block cursor-pointer group"
        onClick={() => router.push("/dashboard/customer/profile")}
        aria-label="Edit Profile"
        title="Profile"
      >
        <Image
          key={"logout_img1_women.jpg"}
          src="/logout_image/logout_img1_women.jpg"
          alt="profile Image"
          fill
          className="object-cover "
        />

        <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-10 whitespace-nowrap">
          Profile
        </span>
      </div>
      {/* User Info - Hidden on tablet icon-view (md), visible on mobile and desktop (lg) */}
      <div className=" md:hidden lg:flex flex-col flex-1 min-w-0">
        <p className="font-semibold text-sm lg:text-lg text-[#D9D9D9] truncate">
          {props.userName}
        </p>
        <p className="text-xs lg:text-base text-gray-500 truncate">
          {props.userRole}
        </p>
      </div>

      {/* Logout Button */}

      <button
        className="flex-shrink-0 p-2 text-gray-400 hover:text-[#D94E4E] hover:bg-white/5 rounded-xl transition-all"
        onClick={logOut}
        title="Logout"
      >
        <LogOutIcon size={20} />
        <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Logout
        </span>
      </button>
    </div>
  );
};

export default LogOutCard;
