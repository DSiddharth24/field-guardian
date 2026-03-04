import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TreePine } from "lucide-react";

interface DashboardLayoutProps {
  role: "owner" | "inspector";
}

export function DashboardLayout({ role }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar role={role} />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b px-4 bg-card">
            <SidebarTrigger className="mr-3" />
            <div className="flex items-center gap-2">
              <TreePine className="h-5 w-5 text-primary" />
              <span className="font-display font-semibold text-foreground">FieldGuard</span>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
