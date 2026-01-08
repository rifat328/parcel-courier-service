import React from "react";

const LogoMain = (props) => {
  return (
    <div className={`logo-main ${props.size} font-nico tracking-widest`}>
      <span className="font-nico text-[#4EC4D9]">P</span>
      <span className="font-nico text-[#DB9118]">C</span>
      <span className="font-nico text-[#D94E4E]">S</span>
    </div>
  );
};

export default LogoMain;
