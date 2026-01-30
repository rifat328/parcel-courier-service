import React from "react";
import ActiveParcelTable from "./ActiveParcelTable";
import mockParcels from "../mockParcel";
const ActiveParcel = () => {
  return (
    <section className=" h-full flex flex-col border m-4 border-red-500">
      <div className="px-4 pt-1">
        <h2 className="m-0 md:text-lg text-lg font-roboto font-semibold ">
          Active Parcel
        </h2>
      </div>
      <div className="p-4 pt-2 mt-2 bg-card-gray rounded-2xl overflow-x-auto overflow-y-auto ">
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
