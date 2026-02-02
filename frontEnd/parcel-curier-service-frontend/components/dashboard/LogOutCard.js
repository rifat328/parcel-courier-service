"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

  const goToProfile = () => {
    router.push("/profile");
  };

  return (
    <div className="bg-card-gray p-2 rounded-xl w-auto flex items-center gap-3">
      <div
        className="log_out w-[50] h-[50] rounded-[50%] bg-accent overflow-hidden cursor-pointer hover:scale-110 hover:opacity-80 transition-transform duration-200 relative group"
        onClick={goToProfile}
        aria-label="Edit Profile"
        title="Profile"
      >
        <Image
          key={"logout_img1_women.jpg"}
          src="/logout_image/logout_img1_women.jpg"
          alt="profile Image"
          width={50}
          height={50}
          className="object-cover w-full h-full"
        />
        <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-10 whitespace-nowrap">
          Profile
        </span>
      </div>

      <div className="flex flex-col">
        <p className="font-semibold text-[#D9D9D9]">{props.userName}</p>
        <p className="text-sm text-gray-600">{props.userRole}</p>
      </div>

      <button
        className="ml-auto w-[40] h-[40] hover:scale-110 hover:opacity-80 transition-transform duration-200 cursor-pointer relative group"
        onClick={logOut}
        title="Logout"
      >
        <Image
          key={"logout_icon.png"}
          alt="logout icone"
          width={40}
          height={40}
          src="/logout_image/logout_icon.png"
          className="object-cover w-full h-full"
        />
        <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Logout
        </span>
      </button>
    </div>
  );
};

export default LogOutCard;
