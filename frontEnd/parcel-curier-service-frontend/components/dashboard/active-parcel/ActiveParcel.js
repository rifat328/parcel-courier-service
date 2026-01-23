import React from "react";
import ActiveParcelTable from "./ActiveParcelTable";
import mockParcels from "../mockParcel";
const ActiveParcel = () => {
  return (
    <section className=" h-full flex flex-col">
      <div className="px-4 pt-1">
        <h2 className="m-0 md:text-lg text-lg font-roboto font-regular ">
          Active Parcel
        </h2>
      </div>
      <div className="p-4 pt-3 overflow-x-auto">
        <ActiveParcelTable parcels={mockParcels} />
      </div>
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
