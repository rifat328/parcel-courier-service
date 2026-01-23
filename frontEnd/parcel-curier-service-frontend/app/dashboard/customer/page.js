import ActiveParcel from "@/components/dashboard/active-parcel/ActiveParcel";
import React from "react";

const CustomerDashboard = () => {
  const backgroundStyle = {
    backgroundColor: "#0D0D0D",
    backgroundImage: "url('/textures/card-noise.png')",
    backgroundRepeat: "repeat",
    backgroundSize: "120px 120px", // grid texture fixed
  };

  return (
    <section className="flex flex-col min-h-screen w-full font-roboto border border-red-500">
      {/* 🔒 Sticky Header */}
      <header
        className="sticky top-0 z-20 h-[80px] rounded-t-4xl"
        style={backgroundStyle}
      >
        <div className="flex h-full items-center px-5 justify-between">
          <input
            type="text"
            className="bg-[#0D0D0D] p-3 rounded-xl placeholder:text-white/80 text-xs focus:outline-2"
            placeholder="Search #Id"
          />
          <button className="bg-black rounded-2xl px-4 py-3">
            Create Parcel
          </button>
        </div>
      </header>

      {/* 🧠 Scroll container (ONLY ONE) */}
      <main className="flex-1 overflow-y-auto mt-3 px-4">
        {/* Above the fold */}
        <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-4">
          <div className="md:col-span-5 lg:col-span-8 p-1 rounded-xl border border-red-500 ">
            <ActiveParcel />
          </div>

          <div className="md:col-span-3 lg:col-span-4 space-y-4 border border-red-500">
            <h1>key matrix</h1>
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
