import React from "react";

const CustomerDashboard = () => {
  return (
    <section className="grid grid-cols-12 grid-rows-[auto_1fr_1fr] gap-2 h-full w-full font-roboto outline outline-red-500">
      <div className="dashboard-Header col-span-12  gap-3 rounded-t-4xl bg-amber-300">
        <div className="flex p-5 justify-between">
          <input
            type="text"
            className="bg-[#0D0D0D] p-3 rounded-xl font-primary placeholder:text-white/80 text-xs font-[300] focus:outline-2 focus:outline-offset-2"
            placeholder="Search #Id"
          />
          <button className="bg-black rounded-2xl p-3">Create Parcel</button>
        </div>
      </div>
      <div className="active-parcel col-span-8 bg-card rounded-xl p-4">
        <h1>Active parcel</h1>
      </div>
      <div className="key-metrix col-span-4 space-y-4">
        <h1>key matrix</h1>
      </div>
      <div className="tracking-timeline col-span-12 bg-card rounded-xl p-4">
        <h1>tracking</h1>
      </div>
      <div className="recent-bookings col-span-12 bg-card rounded-xl p-4">
        <h1>recent booking</h1>
      </div>
    </section>
  );
};

export default CustomerDashboard;
