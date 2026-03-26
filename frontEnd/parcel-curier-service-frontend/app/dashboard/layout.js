import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserProvider } from "@/context/DashboardUserContext";
import AdminSidebar from "@/components/AdminSidebar";
import CustomerSidebar from "@/components/CustomerSidebar";
import AgentSidebar from "@/components/AgentSidebar";
import DashboardUI from "@/components/dashboard/DashboardUI";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  //if the user is not loged in
  if (!token) {
    redirect("/sign-in");
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const currentAuthenticatedUser =
    process.env.NEXT_PUBLIC_API_GET_CURRENT_AUTHENTICATED_USER_ROUTE;
  // verify user
  console.log("VERIFY URL:", `${apiBaseUrl}${currentAuthenticatedUser}`);

  const response = await fetch(`${apiBaseUrl}${currentAuthenticatedUser}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });
  // DEBUGGING BLOCK START
  if (!response.ok) {
    // const errorText = await response.text();
    // console.log("❌ BACKEND ERROR STATUS:", response.status);
    // console.log("❌ BACKEND ERROR BODY:", errorText);
    redirect("/sign-in");
  }
  // DEBUGGING BLOCK END
  // if (!response.ok) redirect("/sign-in");
  const user = await response.json();
  console.log("COOKIE STORE:", cookieStore.getAll());

  let selectedSidebar;
  if (user.role === "customer") {
    selectedSidebar = <CustomerSidebar />;
  } else if (user.role === "admin") {
    selectedSidebar = <AdminSidebar />;
  } else {
    selectedSidebar = <AgentSidebar />;
  }
  //UserProvider is global context
  // ReactQueryProvider is ReactQuery.
  return (
    //  sideBar and main passed to a shell /UI provider because this layout is
    //   server component
    <UserProvider user={user}>
      <ReactQueryProvider>
        <DashboardUI sidebar={selectedSidebar}>{children}</DashboardUI>
      </ReactQueryProvider>
    </UserProvider>
  );
}
