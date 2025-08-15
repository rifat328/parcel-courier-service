import React from "react";
import { Truck } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
const CustomerDashboard = ({ data }) => {
  return (
    <main>
      <DashboardCard
        title="Active Shipments"
        value="Rifat"
        description="Total number of shipments made"
        icon={Truck}
        color="purple-500"
      />
      {/* <DashboardCard
        title="Active Shipments"
        value={data.totalShipments}
        description="Total number of shipments made"
        icon={Truck}
        color="purple-500"
      />
      <DashboardCard
        title="Pending Pickups"
        value={data.totalShipments}
        description="Total number of shipments made"
        icon={Truck}
        color="purple-500"
      />
      <DashboardCard
        title="Delivered This Month"
        value={data.totalShipments}
        description="Total number of shipments made"
        icon={Truck}
        color="purple-500"
      />
      <DashboardCard
        title="total Spent"
        value={data.totalShipments}
        description="Total number of shipments made"
        icon={Truck}
        color="purple-500"
      /> */}
    </main>
  );
};

export default CustomerDashboard;
