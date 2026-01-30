import React from "react";
import StatusBadge from "../StatusBadge";
const ActiveParcelRow = ({ parcel }) => {
  return (
    <tr className="border-b  text-white border-white/5 hover:bg-white/5 transition font-roboto">
      <td className="py-3 text-white/70">{parcel.id}</td>
      <td>{parcel.address}</td>
      <td>{parcel.date}</td>
      <td>
        <StatusBadge status={parcel.status} />
      </td>
      <td>{parcel.payment}</td>
      <td className="text-right">{parcel.amount}</td>
    </tr>
  );
};

export default ActiveParcelRow;

/*
components/
 └─ dashboard/
     └─ active-parcel/
         ├─ ActiveParcel.tsx
         ├─ ActiveParcelTable.tsx
         !├─ ActiveParcelRow.tsx
         └─ columns.ts
*/
