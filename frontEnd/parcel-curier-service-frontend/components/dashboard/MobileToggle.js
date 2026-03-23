import React from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

const MobileToggle = ({ isMobileOpen, setIsMobileOpen }) => {
  return (
    <>
      {/* Mobile Toggle Button - only show on mobile, hide on tablet+ */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden  bg-[#1A1A1A] text-[#D94E4E] rounded-lg "
      >
        {isMobileOpen ? (
          <PanelRightOpen size={24} />
        ) : (
          <PanelRightClose size={24} />
        )}
      </button>

      {/* Overlay for mobile only */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default MobileToggle;
