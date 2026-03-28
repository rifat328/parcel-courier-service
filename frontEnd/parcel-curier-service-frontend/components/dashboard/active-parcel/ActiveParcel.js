"use client";
import React from "react";
import ActiveParcelTable from "./ActiveParcelTable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
//QueryKey ['parcels', 'active']

const ActiveParcel = () => {
  const {
    data: parcels,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["parcels", "active"],
    queryFn: fetchActiveParcels,
  });
  if (isLoading) return <div>Loading active parcels... ⏳</div>;
  if (isError) return <div>Error: {error.message} ⚠️</div>;

  return (
    <section className=" h-full flex flex-col border m-4 border-red-500">
      <div className="px-4 pt-1">
        <h2 className="m-0 md:text-lg text-lg font-roboto font-semibold ">
          Active Parcel ({parcels?.length || 0})
        </h2>
      </div>
      <div className="p-4 pt-2 mt-2 bg-card-gray h-full rounded-2xl overflow-x-auto overflow-y-auto ">
        <ActiveParcelTable parcels={parcels} />
      </div>
    </section>
  );
};

export default ActiveParcel;

async function fetchActiveParcels() {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const route = process.env.NEXT_PUBLIC_API_GET_ALL_PARCELS_ROUTE;
  try {
    const response = await axios.get(`${baseURL}${route}?status=active`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error);
  }
}

/*
components/
 └─ dashboard/
     └─ active-parcel/
         !├─ ActiveParcel.tsx
         ├─ ActiveParcelTable.tsx
         ├─ ActiveParcelRow.tsx
         └─ columns.ts
*/
