'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname
import {
  LayoutDashboard,
  Database,
  Users,
  Settings,
  Menu,
  LogOut,
  Home,
  Package,
  BarChart3,
  Tag,
  UserCog,
  List,
  Plus,
  Key // Import Key icon
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
    // No href for parent item, rely on sub-items
    icon: Database,
    subItems: [
      { name: 'مشاهده همه', href: '/admin/datasets', icon: List }, // Added icons
      { name: 'افزودن جدید', href: '/admin/datasets/add', icon: Plus },
      { name: 'دسته‌بندی‌ها', href: '/admin/categories', icon: Tag }, // Corrected path
      { name: 'تگ‌ها', href: '/admin/tags', icon: Tag }, // Corrected path
      { name: 'کلیدهای API', href: '/admin/datasets/api', icon: Key }, // Added API Keys link
    ],
  },
  { name: 'کاربران', href: '/admin/users', icon: Users },
  { name: 'آمار', href: '/admin/analytics', icon: BarChart3 },
  { name: 'تنظیمات', href: '/admin/settings', icon: Settings },
];

function AdminSidebar() {
    const { state } = useSidebar(); // Get sidebar state
    const pathname = usePathname(); // Get current path

    // Check if a path is active (exact match or parent of sub-item)
    const isActive = React.useCallback((href?: string, subItems?: { href: string }[]) => {
        if (subItems) {
            // If it's a parent item, check if any subitem is active or if the parent href itself is active (if it exists)
             const isParentActive = href ? pathname.startsWith(href) : false;
             const isSubItemActive = subItems.some(sub => pathname === sub.href);
             return isParentActive || isSubItemActive;
        }
        if (href) {
            // For main items with href, check if the current path starts with the item's href
            // Ensure dashboard is only active for exact match
            if (href === '/admin') {
                return pathname === href;
            }
            // Check if current path starts with href or matches exactly
            return pathname.startsWith(href);
        }
        return false;
    }, [pathname]);

    return (
        // Set side to right for RTL, default state to expanded
        <Sidebar side="right" collapsible="icon" defaultOpen={true}>
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
                                    // Active if any subitem path is active
                                    isActive={isActive(undefined, item.subItems)}
                                    tooltip={state === 'collapsed' ? item.name : undefined}
                                >
                                    <item.icon />
                                    <span className={`${state === 'collapsed' ? 'hidden' : ''}`}>{item.name}</span>
                                </SidebarMenuButton>
                                {/* Render sub-menu always but hide/show based on parent state (handled by SidebarMenuSub logic) */}
                                <SidebarMenuSub>
                                    {item.subItems.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.name}>
                                            <Link href={subItem.href} passHref legacyBehavior>
                                                <SidebarMenuSubButton isActive={pathname === subItem.href}>
                                                    {subItem.icon && <subItem.icon className="ml-2 h-4 w-4" />} {/* Added sub-item icon */}
                                                    {subItem.name}
                                                </SidebarMenuSubButton>
                                            </Link>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
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
            <SidebarFooter className="p-4 border-t border-sidebar-border mt-auto">
                {/* User profile dropdown or link */}
                <DropdownMenu dir="rtl">
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className={`w-full justify-start ${state === 'collapsed' ? 'px-0 justify-center' : 'px-2'}`}>
                            <Avatar className={`h-8 w-8 ${state === 'collapsed' ? '' : 'ml-2'}`}>
                                <AvatarImage src="/placeholder-user.jpg" alt="Admin Avatar" data-ai-hint="user avatar" />
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                            <span className={`text-sm font-medium ${state === 'collapsed' ? 'hidden' : ''}`}>مدیر سیستم</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
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
                 {/* Trigger moved to header */}
            </SidebarFooter>
        </Sidebar>
    );
}


function AdminHeader() {
    const { isMobile, toggleSidebar } = useSidebar(); // Get sidebar state and toggle function

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            {/* Sidebar Trigger */}
             <Button size="icon" variant="outline" onClick={toggleSidebar} className={isMobile ? "" : "sm:hidden"}> {/* Show on mobile, hide on desktop unless mobile */}
                 <Menu className="h-5 w-5" />
                 <span className="sr-only">Toggle Menu</span>
             </Button>
             {/* Desktop Trigger (appears when not mobile) */}
             {!isMobile && (
                 <Button size="icon" variant="ghost" onClick={toggleSidebar} className="hidden sm:flex">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                 </Button>
             )}

            {/* Add breadcrumbs or search here if needed */}
            <div className="flex-1"></div> {/* Spacer */}
            <Button asChild variant="ghost" size="sm" className="mr-auto">
                <Link href="/">
                    <Home className="w-4 h-4 ml-1" />
                    بازگشت به سایت
                </Link>
            </Button>
            {/* User Dropdown moved to Sidebar Footer for better consistency */}
        </header>
    );
}


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider defaultOpen={true}> {/* Keep sidebar expanded by default */}
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <AdminSidebar />
                 {/* Main content area adjustment based on sidebar state */}
                {/* Updated class for proper padding based on sidebar width and state */}
                 {/* Use pr for right-side sidebar */}
                <div className="flex flex-col sm:gap-4 sm:py-4 transition-all duration-200 ease-linear group-data-[sidebar-hidden=false]/sidebar-wrapper:sm:mr-[var(--sidebar-width)] group-data-[sidebar-hidden=true]/sidebar-wrapper:sm:mr-[var(--sidebar-width-icon)]">
                    <AdminHeader />
                    <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    );
}
