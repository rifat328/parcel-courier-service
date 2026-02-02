import React from "react";

const LogoMain = (props) => {
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
    "7xl": "text-7xl",
    "8xl": "text-8xl",
    "9xl": "text-9xl",
  };

  console.log(props.size);
  return (
    <div
      className={`logo-main ${sizeClasses[props.size] || "text-2xl"} font-nico  tracking-widest`}
    >
      <span className="font-nico text-[#4EC4D9]">P</span>
      <span className="font-nico text-[#DB9118]">C</span>
      <span className="font-nico text-[#D94E4E]">S</span>
    </div>
  );
};

export default LogoMain;
