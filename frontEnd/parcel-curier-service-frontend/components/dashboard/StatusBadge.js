import React from "react";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Booked: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    "Picked Up": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "In Transit":
      "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse-subtle",
    Delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Cancelled: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  // small dot for certain statuses
  const showDot = ["In Transit", "Picked Up"].includes(status);

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 
        rounded-md text-[11px] font-bold tracking-wider uppercase
        border border-opacity-50 backdrop-blur-sm
        transition-all duration-300
        ${statusStyles[status] || "bg-gray-500/10 text-gray-400 border-gray-500/20"}
      `}
    >
      {showDot && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {status}
    </span>
  );
};

export default StatusBadge;
