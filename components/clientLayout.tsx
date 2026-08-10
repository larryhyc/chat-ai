'use client';

import AppSiderbar from '@/components/appSiderbar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useSiderBarStore } from '@/store/useSidebar';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDisplay} = useSiderBarStore();
  
  return (
    <SidebarProvider className="flex h-screen scrollbar-hide">
      <AppSiderbar />
      <main className="flex-1 p-3">
        {isDisplay ? '' : <SidebarTrigger/>}
        {children}
      </main>
    </SidebarProvider>
  );
}
