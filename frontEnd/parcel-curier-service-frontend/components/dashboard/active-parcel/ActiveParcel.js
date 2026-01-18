import React from "react";
import ActiveParcelTable from "./ActiveParcelTable";
import mockParcels from "../mockParcel";
const ActiveParcel = () => {
  return (
    <section className="p-4 h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Active Parcel</h2>
      <ActiveParcelTable parcels={mockParcels} />
    </section>
  );
};

export default ActiveParcel;

/*
components/
 └─ dashboard/
     └─ active-parcel/
         !├─ ActiveParcel.tsx
         ├─ ActiveParcelTable.tsx
         ├─ ActiveParcelRow.tsx
         └─ columns.ts
*/
