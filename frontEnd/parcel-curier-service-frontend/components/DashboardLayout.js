import CustomerSidebar from "./CustomerSidebar.js";
import AdminSidebar from "./AdminSidebar.js";
import AgentSidebar from "./AgentSidebar.js";

export default function DashboardLayout({ user, children }) {
  let Sidebar;
  if (user.role === "customer") Sidebar = CustomerSidebar;
  if (user.role === "admin") Sidebar = AdminSidebar;
  if (user.role === "agent") Sidebar = AgentSidebar;

  return (
    <div className="flex min-h-screen">
      <Sidebar /> {/* retractable sidebar logic can be inside each sidebar */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
