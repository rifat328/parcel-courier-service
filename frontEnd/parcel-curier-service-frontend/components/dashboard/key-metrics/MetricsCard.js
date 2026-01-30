import React from "react";
import MetricLineChart from "../charts/MetricLineChart";
const MetricsCard = ({ title, number, trend }) => {
  return (
    <>
      <div className="flex items-center justify-between rounded-xl p-4">
        {/* Left content */}
        <div className="content border-r-1  border-white/20">
          <h2 className="font-roboto font-normal text-sm text-white/60">
            {title}
          </h2>
          <h2 className="font-roboto font-bold text-2xl">{number}</h2>
        </div>
        {/* right content : Chart */}
        <div className="graph h-[60px] w-[120px]">
          <MetricLineChart data={trend} />
        </div>
      </div>
    </>
  );
};

export default MetricsCard;
