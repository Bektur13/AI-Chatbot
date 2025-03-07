import DashboardIcon from "@/app/icons/dashboard-icon"
import ChatIcon from "@/app/icons/chat-icon" 
import IntegrationsIcon from "@/app/icons/integrations-icon"
import CalIcon from "@/app/icons/cal-icon"
import EmailIcon from "@/app/icons/email-icon"
import SettingsIcon from "@/app/icons/settings-icon"



import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import DomainMenu from "../sidebar/domain-menu"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: DashboardIcon,
  },
  {
    title: "Conversations",
    url: "#",
    icon: ChatIcon,
  },
  {
    title: "Integrations",
    url: "#",
    icon: IntegrationsIcon,
  },
  {
    title: "Appointments",
    url: "#",
    icon: CalIcon,
  },
  {
    title: "Email Marketing",
    url: "#",
    icon: EmailIcon,
  },
  {
    title: "Settings",
    url: "#",
    icon: SettingsIcon,
  },
]

export default function AppSidebar() {
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
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <DomainMenu />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
