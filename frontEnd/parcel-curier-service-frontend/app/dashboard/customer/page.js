import React from "react";

const CustomerDashboard = () => {
  return (
    <section className="flex flex-col h-full w-full font-roboto outline outline-red-500">
      {/* Header */}

      <div className="dashboard-Header col-span-1 md:col-span-8 lg:col-span-12  gap-3 rounded-t-4xl  bg-amber-300 outline outline-red-500">
        <div className="flex p-5 justify-between">
          <input
            type="text"
            className="bg-[#0D0D0D] p-3 rounded-xl font-primary placeholder:text-white/80 text-xs font-[300] focus:outline-2 focus:outline-offset-2"
            placeholder="Search #Id"
          />
          <button className="bg-black rounded-2xl p-3">Create Parcel</button>
        </div>
      </div>
      {/* CONTENT GRID */}
      <div className="content-grid grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-4 flex-1 outline outline-red-500">
        <div className="active-parcel  md:col-span-5 lg:col-span-8  bg-card p-4 rounded-xl outline outline-red-500">
          <h1>Active parcel</h1>
        </div>
        <div className="key-metrix  md:col-span-3 lg:col-span-4  space-y-4 outline outline-red-500">
          <h1>key matrix</h1>
        </div>
        <div className="tracking-timeline  md:col-span-8 lg:col-span-12 bg-card p-4 rounded-xl outline outline-red-500">
          <h1>tracking</h1>
        </div>
        <div className="recent-bookings  md:col-span-8 lg:col-span-12 bg-card p-4 rounded-xl outline outline-red-500">
          <h1>recent booking</h1>
        </div>
      </div>
    </section>
  );
};

export default CustomerDashboard;
