import React from "react";
import MetricLineChart from "../charts/MetricLineChart";
const MetricsCard = ({ title, number, trend }) => {
  const last = trend[trend.length - 1];
  const prev = trend[trend.length - 2] ?? last;

  const percent = (((last - prev) / prev) * 100).toFixed(1);
  const isUp = percent >= 0;
  return (
    <>
      <div className="flex items-center justify-between rounded-xl  bg-[#1E1E1E]">
        {/* Left content */}
        <div className="content px-2 py-4 border-r-1  border-white/20 w-full h-full">
          <h2 className="font-roboto font-normal text-sm text-white/60">
            {title}
          </h2>
          <h2 className="font-roboto font-bold text-2xl">{number}</h2>
        </div>
        {/* right content : Chart */}
        <div className="graph  h-[60px] w-[120px]">
          <span
            className={`text-xs ${isUp ? "text-green-400" : "text-red-400"}`}
          >
            {isUp ? "▲" : "▼"} {Math.abs(percent)}%
          </span>
          <MetricLineChart data={trend} />
        </div>
      </div>
    </>
  );
};

export default MetricsCard;
