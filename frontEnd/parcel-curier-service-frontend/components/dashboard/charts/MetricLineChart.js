"use client";

import React from "react";
import { LineChart, Line } from "recharts";
const MetricLineChart = ({ data }) => {
  const chatData = data.map((v, i) => ({ i, v }));
  return (
    <div>
      <LineChart width={120} height={60} data={chatData}>
        <Line
          type="monotone"
          dataKey="v"
          stroke="#22c55e"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </div>
  );
};

export default MetricLineChart;
