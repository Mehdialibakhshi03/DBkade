'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Database,
  Users,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Home,
  Package,
  BarChart3,
  Tag,
  UserCog,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarGroup,
  SidebarGroupLabel,
  useSidebar,
} from '@/components/ui/sidebar'; // Assuming sidebar components are in this path

// Define navigation items for the admin panel
const adminNavItems = [
  { name: 'داشبورد', href: '/admin', icon: LayoutDashboard },
  {
    name: 'دیتاست‌ها',
    icon: Database,
    subItems: [
      { name: 'مشاهده همه', href: '/admin/datasets' },
      { name: 'افزودن جدید', href: '/admin/datasets/add' },
      { name: 'دسته‌بندی‌ها', href: '/admin/categories' },
      { name: 'تگ‌ها', href: '/admin/tags' },
    ],
  },
  { name: 'کاربران', href: '/admin/users', icon: Users },
  { name: 'آمار', href: '/admin/analytics', icon: BarChart3 },
  { name: 'تنظیمات', href: '/admin/settings', icon: Settings },
];

function AdminSidebar() {
    const { state } = useSidebar(); // Get sidebar state

    // Memoize the active state check to prevent unnecessary recalculations
    // In a real app, you'd use usePathname() from next/navigation
    const isActive = React.useCallback((href: string) => {
      // Placeholder logic: Check if the current path starts with the item's href
      // Replace with actual path checking using usePathname()
      return typeof window !== 'undefined' && window.location.pathname.startsWith(href);
    }, []);


    return (
      <Sidebar side="right" collapsible="icon"> {/* Set side to right for RTL */}
        <SidebarHeader className="flex items-center justify-between p-4">
           <Link href="/admin" className={`flex items-center gap-2 font-semibold ${state === 'collapsed' ? 'hidden' : ''}`}>
              <Package className="h-6 w-6 text-primary" />
              <span>پنل مدیریت</span>
           </Link>
           {/* Trigger is now part of the AdminHeader */}
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {adminNavItems.map((item) =>
              item.subItems ? (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild={!item.subItems} // Button is not a link if it has subItems
                    isActive={item.subItems.some(sub => isActive(sub.href))} // Active if any subitem is active
                    tooltip={state === 'collapsed' ? item.name : undefined}
                  >
                    {/* Use a div if it's a trigger for sub-menu */}
                     <div>
                      <item.icon />
                      <span className={`${state === 'collapsed' ? 'hidden' : ''}`}>{item.name}</span>
                     </div>
                  </SidebarMenuButton>
                  {state === 'expanded' && ( // Only render sub-menu when expanded
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.name}>
                          <Link href={subItem.href} passHref legacyBehavior>
                             <SidebarMenuSubButton isActive={isActive(subItem.href)}>
                                {subItem.name}
                             </SidebarMenuSubButton>
                          </Link>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ) : (
                <SidebarMenuItem key={item.name}>
                  <Link href={item.href} passHref legacyBehavior>
                    <SidebarMenuButton
                      isActive={isActive(item.href)}
                      tooltip={state === 'collapsed' ? item.name : undefined}
                    >
                      <item.icon />
                      <span className={`${state === 'collapsed' ? 'hidden' : ''}`}>{item.name}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarContent>
         <SidebarFooter className="p-2">
            {/* Add footer elements if needed, e.g., user profile link */}
         </SidebarFooter>
      </Sidebar>
    );
}


function AdminHeader() {
  const { isMobile, toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {isMobile && ( // Show menu trigger only on mobile
         <Button size="icon" variant="outline" onClick={toggleSidebar} className="sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      )}
      {/* Add breadcrumbs or search here if needed */}
      <div className="flex-1"></div> {/* Spacer */}
      <Button asChild variant="ghost" size="sm" className="mr-auto">
         <Link href="/">
           <Home className="w-4 h-4 mr-1" />
           بازگشت به سایت
         </Link>
       </Button>
      <DropdownMenu dir="rtl"> {/* Ensure Dropdown respects RTL */}
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt="Admin Avatar" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>حساب کاربری</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserCog className="ml-2 h-4 w-4" />
            پروفایل
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="ml-2 h-4 w-4" />
            تنظیمات
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="ml-2 h-4 w-4" />
            خروج
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <SidebarProvider defaultOpen={false}> {/* Keep sidebar collapsed by default */}
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <AdminSidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 sm:pr-0 group-data-[collapsible=icon]/sidebar-wrapper:sm:pl-14 group-data-[collapsible=offcanvas]/sidebar-wrapper:sm:pl-0 group-data-[state=expanded]/sidebar-wrapper:sm:pr-[16rem]">
          <AdminHeader />
          <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
