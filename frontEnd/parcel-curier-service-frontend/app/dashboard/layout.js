import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserProvider } from "@/context/UserContext";
import AdminSidebar from "@/components/AdminSidebar";
import CustomerSidebar from "@/components/CustomerSidebar";
import AgentSidebar from "@/components/AgentSidebar";

export default async function DashboardLayout({ children }) {
  const token = cookies().get("token")?.value;
  if (!token) redirect("/sign-in");
  //fetch the user securely on the server side (SSR)
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const user = res.data;
  } catch (error) {
    console.error(
      "Error fetching user:",
      error.response?.data || error.message
    );
  }
}
