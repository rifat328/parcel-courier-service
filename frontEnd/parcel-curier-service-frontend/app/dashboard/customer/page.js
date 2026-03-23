import ActiveParcel from "@/components/dashboard/active-parcel/ActiveParcel";
import KeyMetrics from "@/components/dashboard/key-metrics/KeyMetrics";
import Header from "@/components/dashboard/Header";
import React from "react";

const CustomerDashboard = () => {
  return (
    <section className="flex flex-col h-full w-full font-roboto">
      {/* Sticky Header */}
      <Header />

      {/* Scrollable content */}
      <main className="flex-1 mt-3 pb-5">
        {/* Above the fold */}
        <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-4 min-h-[calc(100vh-80px)]">
          <div className="md:col-span-5 lg:col-span-8 p-1 h-full  background-mesh-style">
            <ActiveParcel />
          </div>

          <div className="md:col-span-3 lg:col-span-4 space-y-4 background-mesh-style">
            <KeyMetrics />
          </div>
        </div>

        {/* Below the fold */}
        <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-4 mt-4">
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
