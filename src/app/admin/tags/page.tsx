'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle, ListFilter, MoreHorizontal, Trash2, Edit, Tag, File } from 'lucide-react';
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
import { Input } from '@/components/ui/input'; // Import Input
import { Label } from '@/components/ui/label'; // Import Label
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'; // Import Dialog components


// Mock data for tags
const tags = [
  { id: 'tag001', name: 'ایران', datasetCount: 50 },
  { id: 'tag002', name: 'کدپستی', datasetCount: 5 },
  { id: 'tag003', name: 'اقتصاد', datasetCount: 12 },
  { id: 'tag004', name: 'جمعیت', datasetCount: 8 },
  { id: 'tag005', name: 'خودرو', datasetCount: 3 },
  // Add more mock tags
];

export default function AdminTagsPage() {
   const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
   const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
   const [selectedTag, setSelectedTag] = React.useState<typeof tags[0] | null>(null);

   // Handlers for adding/editing tags would go here

  return (
    <div className="grid flex-1 auto-rows-max gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
       <div className="flex items-center mb-4"> {/* Added mb-4 */}
        <h1 className="text-xl font-semibold">مدیریت تگ‌ها</h1>
         <div className="ml-auto flex items-center gap-2 mr-auto">
            {/* Export button can be added here */}
            <Button size="sm" variant="outline" className="h-7 gap-1">
             <File className="h-3.5 w-3.5" />
             <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
               خروجی
             </span>
           </Button>
           <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
             <DialogTrigger asChild>
               <Button size="sm" className="h-7 gap-1">
                 <PlusCircle className="h-3.5 w-3.5" />
                 <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                   افزودن تگ
                 </span>
               </Button>
             </DialogTrigger>
             <DialogContent className="sm:max-w-[425px]" dir="rtl">
               <DialogHeader>
                 <DialogTitle>افزودن تگ جدید</DialogTitle>
                 <DialogDescription>
                   نام تگ جدید را وارد کنید.
                 </DialogDescription>
               </DialogHeader>
               <div className="grid gap-4 py-4">
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="add-tag-name" className="text-right">
                     نام تگ
                   </Label>
                   <Input id="add-tag-name" placeholder="مثال: قیمت ارز" className="col-span-3" />
                 </div>
               </div>
               <DialogFooter>
                 <DialogClose asChild>
                   <Button type="button" variant="secondary">لغو</Button>
                 </DialogClose>
                 <Button type="submit">افزودن</Button> {/* Add onClick handler */}
               </DialogFooter>
             </DialogContent>
           </Dialog>
         </div>
       </div>

       <Card>
         <CardHeader>
           <CardTitle>تگ‌ها</CardTitle>
           <CardDescription>
             مدیریت تگ‌های استفاده شده در دیتاست‌ها.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead>نام تگ</TableHead>
                 <TableHead>تعداد دیتاست مرتبط</TableHead>
                 <TableHead>
                   <span className="sr-only">اقدامات</span>
                 </TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {tags.map((tag) => (
                 <TableRow key={tag.id}>
                   <TableCell className="font-medium">
                     <Tag className="h-3 w-3 inline-block ml-1 text-muted-foreground"/>
                     {tag.name}
                     </TableCell>
                   <TableCell>{tag.datasetCount}</TableCell>
                   <TableCell>
                     <Dialog open={isEditDialogOpen && selectedTag?.id === tag.id} onOpenChange={(open) => { if (!open) setSelectedTag(null); setIsEditDialogOpen(open); }}>
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
                              <DialogTrigger asChild>
                                 <DropdownMenuItem onSelect={() => {setSelectedTag(tag); setIsEditDialogOpen(true);}}>
                                   <Edit className="h-3.5 w-3.5 ml-2" /> ویرایش
                                 </DropdownMenuItem>
                               </DialogTrigger>
                             <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                               <Trash2 className="h-3.5 w-3.5 ml-2" /> حذف
                             </DropdownMenuItem>
                           </DropdownMenuContent>
                         </DropdownMenu>
                       <DialogContent className="sm:max-w-[425px]" dir="rtl">
                         <DialogHeader>
                           <DialogTitle>ویرایش تگ: {selectedTag?.name}</DialogTitle>
                           <DialogDescription>
                             نام تگ را به‌روزرسانی کنید.
                           </DialogDescription>
                         </DialogHeader>
                         <div className="grid gap-4 py-4">
                           <div className="grid grid-cols-4 items-center gap-4">
                             <Label htmlFor="edit-tag-name" className="text-right">
                               نام تگ
                             </Label>
                             <Input id="edit-tag-name" defaultValue={selectedTag?.name} className="col-span-3" />
                           </div>
                         </div>
                         <DialogFooter>
                            <DialogClose asChild>
                               <Button type="button" variant="secondary" onClick={() => setSelectedTag(null)}>لغو</Button>
                             </DialogClose>
                           <Button type="submit">ذخیره تغییرات</Button> {/* Add onClick handler */}
                         </DialogFooter>
                       </DialogContent>
                     </Dialog>
                   </TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </CardContent>
         <CardFooter>
           <div className="text-xs text-muted-foreground">
             نمایش <strong>{tags.length}</strong> از <strong>{tags.length}</strong> تگ
           </div>
           {/* Add Pagination component here if needed */}
         </CardFooter>
       </Card>
    </div>
  );
}
