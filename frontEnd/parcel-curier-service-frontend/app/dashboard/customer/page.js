import ActiveParcel from "@/components/dashboard/active-parcel/ActiveParcel";
import KeyMetrics from "@/components/dashboard/key-metrics/KeyMetrics";

import React from "react";

const CustomerDashboard = () => {
  return (
    <section className="flex flex-col h-screen w-full font-roboto overflow-hidden">
      {/* Scrollable content */}
      <main className="flex-1 mt-3 ">
        {/* Above the fold */}
        {/* total cal of gap : 20px of padding from
        DashboardUI (pt-5), an 80px Header, and 12px of margin (mt-3) = 112px */}
        <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-4 min-h-[calc(100vh-112px)]">
          <div className="md:col-span-5 lg:col-span-8 p-1 h-full  background-mesh-style overflow-hidden">
            <ActiveParcel />
          </div>

          <div className="md:col-span-3 lg:col-span-4 background-mesh-style overflow-hidden">
            <KeyMetrics />
          </div>
        </div>

        {/* Below the fold */}
        <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-4 mt-4 pb-10">
          <div className="md:col-span-12 bg-card p-4 rounded-xl border border-red-500">
            <h1>tracking</h1>
          </div>

          <div className="md:col-span-12 bg-card p-4 rounded-xl border border-red-500">
            <h1>recent booking</h1>
          </div>
        </div>
      </main>
    </section>
  );
};

export default CustomerDashboard;
