import { useApp } from '@/contexts/AppContext';
import { UserRole } from '@/lib/types';
import { NavLink } from '@/components/NavLink';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Stethoscope,
  CalendarCheck,
  Pill,
  FileText,
  AlertTriangle,
  Users,
  ClipboardList,
  Package,
  BarChart3,
  Bell,
  LogOut,
} from 'lucide-react';

const menuItems: Record<UserRole, { title: string; key: string; url: string; icon: any }[]> = {
  patient: [
    { title: 'nav.dashboard', key: 'dashboard', url: '/patient', icon: LayoutDashboard },
    { title: 'Profile', key: 'profile', url: '/patient/profile', icon: Users },
    { title: 'nav.symptomChecker', key: 'symptoms', url: '/patient/symptoms', icon: Stethoscope },
    { title: 'nav.bookConsultation', key: 'consultation', url: '/patient/consultation', icon: CalendarCheck },
    { title: 'nav.findMedicine', key: 'medicine', url: '/patient/medicine', icon: Pill },
    { title: 'nav.healthRecords', key: 'records', url: '/patient/records', icon: FileText },
    { title: 'nav.emergency', key: 'emergency', url: '/patient/emergency', icon: AlertTriangle },
  ],
  doctor: [
    { title: 'nav.dashboard', key: 'dashboard', url: '/doctor', icon: LayoutDashboard },
    { title: 'nav.patients', key: 'patients', url: '/doctor/patients', icon: Users },
    { title: 'nav.diagnosis', key: 'diagnosis', url: '/doctor/diagnosis', icon: ClipboardList },
  ],
  pharmacist: [
    { title: 'nav.dashboard', key: 'dashboard', url: '/pharmacist', icon: LayoutDashboard },
    { title: 'nav.prescriptions', key: 'prescriptions', url: '/pharmacist/prescriptions', icon: ClipboardList },
    { title: 'nav.inventory', key: 'inventory', url: '/pharmacist/inventory', icon: Package },
  ],
  admin: [
    { title: 'nav.dashboard', key: 'dashboard', url: '/admin', icon: LayoutDashboard },
    { title: 'nav.users', key: 'users', url: '/admin/users', icon: Users },
    { title: 'nav.analytics', key: 'analytics', url: '/admin/analytics', icon: BarChart3 },
    { title: 'nav.alerts', key: 'alerts', url: '/admin/alerts', icon: Bell },
  ],
};

export function AppSidebar() {
  const { user, t, logout } = useApp();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const items = menuItems[user.role];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex flex-col justify-between h-full">
        <SidebarGroup>
          <SidebarGroupLabel>{!collapsed && user.full_name}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === `/${user.role}`}
                      className="hover:bg-accent"
                      activeClassName="bg-accent text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{t(item.title)}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="text-destructive hover:bg-destructive/10">
                  <LogOut className="mr-2 h-4 w-4" />
                  {!collapsed && <span>{t('nav.logout')}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
