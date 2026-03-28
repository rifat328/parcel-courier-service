import React from "react";
import StatusBadge from "../StatusBadge";
const ActiveParcelRow = ({ parcel }) => {
  return (
    <tr className="border-b  text-white border-white/5 hover:bg-white/5 transition font-roboto">
      <td className="py-3 text-white/70">{parcel.trackingId}</td>
      <td>{parcel.deliveryAddress}</td>
      <td>{new Date(parcel.createdAt).toLocaleDateString()}</td>
      <td>
        <StatusBadge status={parcel.status} />
      </td>
      <td>{parcel.paymentType}</td>
      <td className="text-right">{parcel.codAmount}</td>
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
