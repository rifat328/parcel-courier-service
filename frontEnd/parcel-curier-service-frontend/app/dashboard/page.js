import CustomerDashboard from "@/components/CustomerDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import AgentDashboard from "@/components/AgentDashboard";
import DashboardLayout from "@/components/DashboardLayout";
import { UserProvider } from "@/context/UserContext";

export default function Dashboard({ user }) {
  // Wrap in context
  return (
    <UserProvider user={user}>
      <DashboardLayout user={user}>
        {user.role === "customer" && <CustomerDashboard data={user} />}
        {user.role === "admin" && <AdminDashboard data={user} />}
        {user.role === "agent" && <AgentDashboard data={user} />}
      </DashboardLayout>
    </UserProvider>
  );
}

// SSR to fetch user
export async function getServerSideProps({ req }) {
  const token = req.cookies.token || null;

  if (!token) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  try {
    const res = await fetch("https://your-backend.com/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await res.json();

    if (!user) {
      return { redirect: { destination: "/login", permanent: false } };
    }

    return { props: { user } };
  } catch (err) {
    return { redirect: { destination: "/login", permanent: false } };
  }
}
