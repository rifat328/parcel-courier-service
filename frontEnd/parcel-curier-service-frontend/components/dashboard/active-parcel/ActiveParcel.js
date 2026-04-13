"use client";
import React from "react";
import ActiveParcelTable from "./ActiveParcelTable";
import { useQuery } from "@tanstack/react-query";
import fetchParcelsByStatus from "utility/fetchParcelByStatus";

//QueryKey ['parcels', 'active']

const ActiveParcel = () => {
  const {
    data: parcels,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["parcels", "active"],
    queryFn: fetchParcelsByStatus,
  });
  if (isLoading) return <div>Loading active parcels... ⏳</div>;
  if (isError) return <div>Error: {error.message} ⚠️</div>;
  console.log(
    "-------------All the parcel data form react Query--------------------",
  );
  console.log(parcels);
  return (
    <section className=" h-full flex flex-col m-4">
      <div className="px-4 pt-1">
        <h2 className="m-0 md:text-lg lg:text-2xl font-roboto font-semibold flex items-center gap-2">
          Active Parcel
          <span className="text-lg text-gray-500 font-normal">
            ({parcels?.length || 0})
          </span>
        </h2>
      </div>
      <div className="p-4 pt-2 mt-2 bg-card-gray h-full rounded-2xl overflow-x-auto overflow-y-auto ">
        <ActiveParcelTable parcels={parcels} />
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
