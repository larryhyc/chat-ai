import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import HeadDropDownMenu from './headDropDownMenu';

const AppSiderbar = () => {
  return (
    <Sidebar className="p-3">
      <SidebarHeader className="flex flex-row p-0 justify-between">
        <HeadDropDownMenu />
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSiderbar;
