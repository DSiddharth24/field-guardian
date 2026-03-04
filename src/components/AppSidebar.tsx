import {
  LayoutDashboard, AlertTriangle, Scale, ShieldCheck, FileText,
  Map, Users, TreePine
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  role: "owner" | "inspector";
}

const ownerItems = [
  { title: "Dashboard", url: "/owner", icon: LayoutDashboard },
  { title: "Grievances", url: "/owner/grievances", icon: AlertTriangle },
  { title: "Weighment", url: "/owner/weighment", icon: Scale },
  { title: "Compliance", url: "/owner/compliance", icon: ShieldCheck },
  { title: "Reports", url: "/owner/reports", icon: FileText },
];

const inspectorItems = [
  { title: "Regional Map", url: "/inspector", icon: Map },
  { title: "Estates", url: "/inspector/estates", icon: TreePine },
  { title: "Grievances", url: "/inspector/grievances", icon: AlertTriangle },
  { title: "Workers", url: "/inspector/workers", icon: Users },
  { title: "Reports", url: "/inspector/reports", icon: FileText },
];

export function AppSidebar({ role }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const items = role === "owner" ? ownerItems : inspectorItems;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className={`p-4 ${collapsed ? "px-2" : ""}`}>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <TreePine className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-display font-bold text-sm text-sidebar-foreground">FieldGuard</h2>
                <p className="text-[10px] text-sidebar-foreground/60 uppercase tracking-wider">
                  {role === "owner" ? "Estate Owner" : "Inspector"}
                </p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/owner" || item.url === "/inspector"}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
