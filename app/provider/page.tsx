import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';

const ProviderPage = ({ children }: { children: React.ReactNode }) => {
  return;
  <div>
    <SidebarProvider>
      <Sidebar />
      <main>{children}</main>
    </SidebarProvider>
  </div>;
};

export default ProviderPage;
