import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>

      <AppSidebar />
      <main classname="text-4xl">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
