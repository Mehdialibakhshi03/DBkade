'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle, File, ListFilter, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
// Tabs are removed as they are now in the layout

// Mock data for datasets
const datasets = [
  {
    id: 'ds001',
    name: 'کدپستی شهرهای ایران',
    category: 'جغرافیا',
    status: 'فعال',
    recordCount: 148329,
    lastUpdate: '۱۴۰۳/۰۱/۲۰',
  },
  {
    id: 'ds002',
    name: 'تقسیمات کشوری ایران',
    category: 'جغرافیا',
    status: 'فعال',
    recordCount: 78500,
    lastUpdate: '۱۴۰۲/۱۱/۰۵',
  },
  {
    id: 'ds003',
    name: 'قیمت روز خودرو',
    category: 'اقتصاد',
    status: 'غیرفعال',
    recordCount: 350,
    lastUpdate: '۱۴۰۳/۰۳/۱۰',
  },
  // Add more mock datasets as needed
];

export default function AdminDatasetsPage() {
  return (
    // Removed main grid div, layout handles spacing
    // Removed Tabs component wrapper
    <>
      <div className="flex items-center mb-4"> {/* Added mb-4 */}
        {/* Filter/Export/Add buttons */}
        <div className="ml-auto flex items-center gap-2 mr-auto"> {/* Use mr-auto for RTL */}
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  فیلتر
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>فیلتر بر اساس</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                دسته‌بندی
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>وضعیت</DropdownMenuCheckboxItem>
              {/* Add more filter options */}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-7 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              خروجی
            </span>
          </Button>
          <Button size="sm" className="h-7 gap-1" asChild>
            <Link href="/admin/datasets/add">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                افزودن دیتاست
              </span>
            </Link>
          </Button>
        </div>
      </div>
      {/* Moved Card inside the default content */}
      <Card>
        <CardHeader>
          <CardTitle>دیتاست‌ها</CardTitle>
          <CardDescription>
            مدیریت دیتاست‌های موجود در سیستم.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نام دیتاست</TableHead>
                <TableHead>دسته‌بندی</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead>تعداد رکورد</TableHead>
                <TableHead>آخرین بروزرسانی</TableHead>
                <TableHead>
                  <span className="sr-only">اقدامات</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datasets.map((dataset) => (
                <TableRow key={dataset.id}>
                  <TableCell className="font-medium">{dataset.name}</TableCell>
                  <TableCell>{dataset.category}</TableCell>
                  <TableCell>
                    <Badge variant={dataset.status === 'فعال' ? 'default' : 'secondary'}>
                      {dataset.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{dataset.recordCount.toLocaleString()}</TableCell>
                  <TableCell>{dataset.lastUpdate}</TableCell>
                  <TableCell>
                    <DropdownMenu dir="rtl">
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>اقدامات</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                           <Link href={`/admin/datasets/edit/${dataset.id}`} className="flex items-center w-full cursor-pointer">
                            <Edit className="h-3.5 w-3.5 ml-2"/> ویرایش
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          <Trash2 className="h-3.5 w-3.5 ml-2"/> حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            نمایش <strong>{datasets.length}</strong> از <strong>{datasets.length}</strong> دیتاست
          </div>
          {/* Add Pagination component here if needed */}
        </CardFooter>
      </Card>
      {/* Removed TabsContent wrapper */}
      {/* Add TabsContent for other statuses (active, inactive) if needed, though filtering might be better */}
    </>
    // Removed closing Tabs tag
  );
}
