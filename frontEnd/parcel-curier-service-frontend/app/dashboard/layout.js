import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserProvider } from "@/context/UserContext";
import AdminSidebar from "@/components/AdminSidebar";
import CustomerSidebar from "@/components/CustomerSidebar";
import AgentSidebar from "@/components/AgentSidebar";

export default async function DashboardLayout({ children }) {}
