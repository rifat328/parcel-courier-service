import React from "react";
import MetricsCard from "./MetricsCard";

const KeyMetrics = () => {
  const cards = [
    {
      title: "Active Shipments",
      number: 12,
      trend: [0, 0, 8, 8, 11, 11, 11, 5, 12, 12],
    },
    { title: "Delivered", number: 84, trend: [80, 50, 94, 54] },
    {
      title: "In Transit",
      number: 18,
      trend: [0, 0, 10, 10, 5, 5, 2, 2, 5],
    },
    { title: "Failed", number: 3, trend: [5, 5, 2, 2, 5, 5, 0, 5, 5, 10] },
    {
      title: "Total Spent",
      number: 1247,
      trend: [0, 0.1, 1, 0, 10, 10, 5, 5, 8, 8, 5, 5, 10, 10, 12, 15],
    },
  ];

  return (
    <section className=" font-roboto">
      <h1 className="my-5  text-lg ">Key Matrix</h1>
      <div
        aria-label="business data"
        className="business-data grid grid-cols-1 gap-4"
      >
        {cards.map((card, indx) => (
          <MetricsCard
            key={indx}
            title={card.title}
            number={card.number}
            trend={card.trend}
          />
        ))}
      </div>
    </section>
  );
};

export default KeyMetrics;
