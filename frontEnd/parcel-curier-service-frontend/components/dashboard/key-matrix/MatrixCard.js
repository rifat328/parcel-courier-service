import React from "react";

const MatrixCard = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="content border-r-1">
          <h2>Active Shipment</h2>
          <h2>{"heading"}</h2>
        </div>
        <div className="graph">{/* show the graph on right  */}</div>
      </div>
    </>
  );
};

export default MatrixCard;
