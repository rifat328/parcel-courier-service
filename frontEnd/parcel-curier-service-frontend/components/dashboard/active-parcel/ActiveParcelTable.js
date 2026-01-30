import React from "react";
import ActiveParcelRow from "./ActiveParcelRow";

const ActiveParcelTable = ({ parcels }) => {
  return (
    <table className="w-full  text-sm bg-card-gray ">
      <thead className="sticky top-0 z-10 text-white/60 border-b border-white/10">
        <tr>
          <th className="text-left py-3 ">Id</th>
          <th>Address</th>
          <th>Date</th>
          <th>Status</th>
          <th>Payment</th>
          <th className="text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {parcels.map((parcel) => (
          <ActiveParcelRow key={parcel.id} parcel={parcel} />
        ))}
      </tbody>
    </table>
  );
};

export default ActiveParcelTable;

/*
components/
 └─ dashboard/
     └─ active-parcel/
         ├─ ActiveParcel.tsx
        ! ├─ ActiveParcelTable.tsx
         ├─ ActiveParcelRow.tsx
         └─ columns.ts
*/
