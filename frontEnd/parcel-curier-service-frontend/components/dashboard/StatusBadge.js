import React from "react";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Booked: "bg-gray-500/10 text-gray-400",
    "Picked Up": "bg-purple-500/10 text-purple-400",
    "In Transit": "bg-blue-500/10 text-blue-400",
    Delivered: "bg-green-500/10 text-green-400",
    Failed: "bg-red-500/10 text-red-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status] || "bg-gray-500/10 text-gray-400"}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
