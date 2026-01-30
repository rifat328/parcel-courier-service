"use client";

import React from "react";
import { LineChart, Line, Tooltip } from "recharts";
const MetricLineChart = ({ data }) => {
  const chatData = data.map((v, i) => ({ i, v }));
  const isUp = data[data.length - 1] >= data[data.length - 2];
  const strokeColor = isUp ? "#22c55e" : "#ef4444";
  return (
    <div>
      <LineChart width={120} height={60} responsive data={chatData}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={strokeColor}
          strokeWidth={0.8}
          dot={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#0D0D0D",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
          }}
        />
      </LineChart>
    </div>
  );
};

export default MetricLineChart;
