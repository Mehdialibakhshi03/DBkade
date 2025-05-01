'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Key, Tag, List } from 'lucide-react'; // Import icons

// Define tabs for the datasets section
const datasetTabs = [
  { name: 'لیست دیتاست‌ها', href: '/admin/datasets', icon: List },
  { name: 'دسته‌بندی‌ها', href: '/admin/categories', icon: Tag },
  { name: 'تگ‌ها', href: '/admin/tags', icon: Tag },
  { name: 'کلیدهای API', href: '/admin/datasets/api', icon: Key },
  // Add other relevant tabs like 'افزودن' if needed, or handle it separately
];

export default function DatasetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Determine the active tab based on the current path
  // Special case for /admin/datasets/add -> activate /admin/datasets
  let activeTabValue = pathname;
  if (pathname === '/admin/datasets/add' || pathname.startsWith('/admin/datasets/edit/')) { // Handle edit route later
      activeTabValue = '/admin/datasets';
  }


  return (
    <div className="flex flex-col gap-4">
      {/* Tab Navigation */}
      {/* Hide tabs on add/edit pages */}
      {!(pathname === '/admin/datasets/add' || pathname.startsWith('/admin/datasets/edit/')) && (
         <Tabs value={activeTabValue} className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-auto flex-wrap justify-start"> {/* Adjust grid columns based on tab count */}
            {datasetTabs.map((tab) => (
                <TabsTrigger key={tab.href} value={tab.href} asChild className="flex gap-1">
                <Link href={tab.href}>
                    <tab.icon className="h-4 w-4" />
                    {tab.name}
                </Link>
                </TabsTrigger>
            ))}
            </TabsList>
            {/* TabsContent is not needed here as routing handles the content */}
         </Tabs>
      )}


      {/* Page Content */}
      {children}
    </div>
  );
}
