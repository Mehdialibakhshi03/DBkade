'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle, ListFilter, MoreHorizontal, Trash2, Edit, UserCog, File } from 'lucide-react'; // Added UserCog
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Import Avatar components

// Mock data for users
const users = [
  {
    id: 'u001',
    name: 'کاربر نمونه ۱',
    email: 'user1@example.com',
    role: 'کاربر عادی',
    status: 'فعال',
    joinDate: '۱۴۰۳/۰۱/۱۵',
    avatarUrl: '/placeholder-user.jpg', // Add avatar URL
  },
  {
    id: 'u002',
    name: 'مدیر سیستم',
    email: 'admin@example.com',
    role: 'مدیر',
    status: 'فعال',
    joinDate: '۱۴۰۲/۱۲/۱۰',
    avatarUrl: null, // Example without avatar
  },
  {
    id: 'u003',
    name: 'کاربر مسدود',
    email: 'blocked@example.com',
    role: 'کاربر عادی',
    status: 'مسدود',
    joinDate: '۱۴۰۳/۰۲/۰۱',
    avatarUrl: '/placeholder-user.jpg',
  },
  // Add more mock users as needed
];

export default function AdminUsersPage() {
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
       {/* Tabs are removed as filtering seems more appropriate via Dropdown */}
       <div className="flex items-center">
         {/* Search bar can be added here */}
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
               <DropdownMenuCheckboxItem checked>نقش</DropdownMenuCheckboxItem>
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
           {/* Add User Button - Consider permissions */}
           <Button size="sm" className="h-7 gap-1" disabled> {/* Disabled for now */}
             <PlusCircle className="h-3.5 w-3.5" />
             <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
               افزودن کاربر
             </span>
           </Button>
         </div>
       </div>

       <Card>
         <CardHeader>
           <CardTitle>کاربران</CardTitle>
           <CardDescription>
             مدیریت کاربران ثبت‌نام شده در سیستم.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead>نام</TableHead>
                 <TableHead>ایمیل</TableHead>
                 <TableHead>نقش</TableHead>
                 <TableHead>وضعیت</TableHead>
                 <TableHead>تاریخ عضویت</TableHead>
                 <TableHead>
                   <span className="sr-only">اقدامات</span>
                 </TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {users.map((user) => (
                 <TableRow key={user.id}>
                   <TableCell className="font-medium">
                     <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user.avatarUrl || undefined} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                       <span>{user.name}</span>
                     </div>
                   </TableCell>
                   <TableCell>{user.email}</TableCell>
                   <TableCell>{user.role}</TableCell>
                   <TableCell>
                     <Badge variant={user.status === 'فعال' ? 'default' : (user.status === 'مسدود' ? 'destructive' : 'secondary')}>
                       {user.status}
                     </Badge>
                   </TableCell>
                   <TableCell>{user.joinDate}</TableCell>
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
                         <DropdownMenuItem>
                           <Edit className="h-3.5 w-3.5 ml-2" /> ویرایش نقش
                         </DropdownMenuItem>
                         <DropdownMenuItem>
                           <UserCog className="h-3.5 w-3.5 ml-2" /> مشاهده جزئیات
                         </DropdownMenuItem>
                         <DropdownMenuSeparator />
                         <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                           <Trash2 className="h-3.5 w-3.5 ml-2" /> حذف کاربر
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
             نمایش <strong>{users.length}</strong> از <strong>{users.length}</strong> کاربر
           </div>
           {/* Add Pagination component here if needed */}
         </CardFooter>
       </Card>
    </div>
  );
}
