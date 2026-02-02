"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const LogOutCard = (props) => {
  const router = useRouter();

  const logOut = () => {
    document.cookie = "";
    router.push("/sign-in");
  };

  const goToProfile = () => {
    router.push("/profile");
  };

  return (
    <div className="bg-card-gray p-3 rounded-xl w-auto flex items-center gap-3">
      <div
        className="log_out w-[50] h-[50] rounded-[50%] bg-accent overflow-hidden cursor-pointer"
        onClick={goToProfile}
      >
        <Image
          key={"logout_img1_women.jpg"}
          src="/logout_image/logout_img1_women.jpg"
          alt="profile Image"
          width={50}
          height={50}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col">
        <p className="font-semibold text-[#D9D9D9]">{props.userName}</p>
        <p className="text-sm text-gray-600">{props.userRole}</p>
      </div>

      <button className="ml-auto w-[40] h-[40]" onClick={logOut}>
        <Image
          key={"logout_icon.png"}
          alt="logout icone"
          width={40}
          height={40}
          src="/logout_image/logout_icon.png"
          className="object-cover w-full h-full"
        />
      </button>
    </div>
  );
};

export default LogOutCard;
