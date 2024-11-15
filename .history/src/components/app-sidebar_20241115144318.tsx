import React from 'react';
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
    url: "home",
    icon: LayoutDashboard,
  },
  {
    title: "Entradas",
    url: "in",
    icon: TrendingUp,
  },
  {
    title: "Saidas",
    url: "out",
    icon: TrendingDown,
  },
];

export function AppSidebar() {
    const { state } = useSidebar(); // Access sidebar state ('expanded' or 'collapsed')
  
    return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center gap-2">
                        <item.icon
                          className={`sidebar-icon ${
                            state === "collapsed"
                              ? "sidebar-collapsed"
                              : "sidebar-expanded"
                          }`}
                        />
                        <span
                          className={`${
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
