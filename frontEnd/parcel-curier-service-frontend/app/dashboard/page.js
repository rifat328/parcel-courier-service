import CustomerDashboard from "@/components/dashboard/CustomerDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import AgentDashboard from "@/components/dashboard/AgentDashboard";

export default function Dashboard({ user }) {
  if (user.role === "customer") return <CustomerDashboard data={userData} />;
  if (user.role === "admin") return <AdminDashboard data={userData} />;
  if (user.role === "agent") return <AgentDashboard data={userData} />;
  return <div>Unauthorized</div>;
}
