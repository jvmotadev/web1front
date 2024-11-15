import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { LayoutDashboard, TrendingDown, TrendingUp } from "lucide-react";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "./",
    icon: LayoutDashboard,
  },
  {
    title: "Entradas",
    url: "./in",
    icon: TrendingUp,
  },
  {
    title: "Saidas",
    url: "./out",
    icon: TrendingDown,
  },
];

export function AppSidebar() {
  const { state } = useSidebar(); // Access sidebar state ('expanded' or 'collapsed')

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='text-2xl mb-6'>Finance.AI</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <div
                        className={`transition-all ease-in-out duration-300 ${
                          state === "collapsed"
                            ? "w-4 h-4" // Smaller size for collapsed state
                            : "w-8 h-8" // Larger size for expanded state
                        } flex items-center justify-center`}
                      >
                        <item.icon className="w-full h-full" />
                      </div>
                        <span
                            className={`text-xl ${
                                state === "collapsed" ? "hidden" : "inline"
                            }`}
                            >
                            {item.title}
                        </span>

                    </a>
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
