import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserProvider } from "@/context/DashboardUserContext";
import AdminSidebar from "@/components/AdminSidebar";
import CustomerSidebar from "@/components/CustomerSidebar";
import AgentSidebar from "@/components/AgentSidebar";

export default async function DashboardLayout({ children }) {
  const token = (await cookies()).get("token")?.value;

  //if the user is not loged in
  if (!toekn) {
    redirect("/sign-in");
  }
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  // verify user
  const response = await fetch(`${apiBaseUrl}/api/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) redirect("/sign-in");
  const user = await response.json();

  return (
    <UserProvider user={user}>
      <div className="flex min-h-screen">
        {user.role === "admin" && <AdminSidebar />}
        {user.role === "customer" && <CustomerSidebar />}
        {user.role === "agent" && <AgentSidebar />}
      </div>
    </UserProvider>
  );
}
