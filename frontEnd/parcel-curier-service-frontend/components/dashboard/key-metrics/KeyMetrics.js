import React from "react";
import MetricsCard from "./MetricsCard";

const KeyMetrics = () => {
  const cards = [
    { title: "Active Shipments", number: 12, trend: [10, 11, 9, 12] },
    { title: "Delivered", number: 84, trend: [70, 72, 80, 84] },
    { title: "In Transit", number: 18, trend: [15, 16, 17, 18] },
    { title: "Failed", number: 3, trend: [2, 3, 2, 3] },
    { title: "Total Spent", number: 1247, trend: [2, 3, 2, 3] },
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
