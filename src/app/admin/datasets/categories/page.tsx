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


// Mock data for categories
const categories = [
  { id: 'cat001', name: 'جغرافیا', description: 'اطلاعات مکانی و جغرافیایی', datasetCount: 15 },
  { id: 'cat002', name: 'اقتصاد', 'description': 'داده‌های مالی و اقتصادی', datasetCount: 8 },
  { id: 'cat003', name: 'آمار', 'description': 'آمار جمعیتی و اجتماعی', datasetCount: 5 },
  { id: 'cat004', name: 'حمل و نقل', 'description': 'داده‌های مربوط به حمل و نقل', datasetCount: 3 },
  // Add more mock categories
];

export default function AdminCategoriesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<typeof categories[0] | null>(null);

  // Handlers for adding/editing categories would go here

  return (
    // Removed main grid div
    <>
       <div className="flex items-center mb-4"> {/* Added mb-4 */}
         <h1 className="text-xl font-semibold">مدیریت دسته‌بندی‌ها</h1>
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
                     افزودن دسته‌بندی
                   </span>
                 </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]" dir="rtl">
                 <DialogHeader>
                   <DialogTitle>افزودن دسته‌بندی جدید</DialogTitle>
                   <DialogDescription>
                     اطلاعات دسته‌بندی جدید را وارد کنید.
                   </DialogDescription>
                 </DialogHeader>
                 <div className="grid gap-4 py-4">
                   <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="add-cat-name" className="text-right">
                       نام
                     </Label>
                     <Input id="add-cat-name" placeholder="مثال: فناوری" className="col-span-3" />
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="add-cat-desc" className="text-right">
                       توضیحات
                     </Label>
                     <Input id="add-cat-desc" placeholder="توضیح کوتاه" className="col-span-3" />
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
           <CardTitle>دسته‌بندی‌ها</CardTitle>
           <CardDescription>
             مدیریت دسته‌بندی‌های دیتاست‌ها.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead>نام دسته‌بندی</TableHead>
                 <TableHead>توضیحات</TableHead>
                 <TableHead>تعداد دیتاست</TableHead>
                 <TableHead>
                   <span className="sr-only">اقدامات</span>
                 </TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {categories.map((category) => (
                 <TableRow key={category.id}>
                   <TableCell className="font-medium">{category.name}</TableCell>
                   <TableCell className="text-muted-foreground">{category.description}</TableCell>
                   <TableCell>{category.datasetCount}</TableCell>
                   <TableCell>
                     <Dialog open={isEditDialogOpen && selectedCategory?.id === category.id} onOpenChange={(open) => { if (!open) setSelectedCategory(null); setIsEditDialogOpen(open); }}>
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
                                <DropdownMenuItem onSelect={() => {setSelectedCategory(category); setIsEditDialogOpen(true);}}>
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
                             <DialogTitle>ویرایش دسته‌بندی: {selectedCategory?.name}</DialogTitle>
                             <DialogDescription>
                                اطلاعات دسته‌بندی را به‌روزرسانی کنید.
                             </DialogDescription>
                           </DialogHeader>
                           <div className="grid gap-4 py-4">
                             <div className="grid grid-cols-4 items-center gap-4">
                               <Label htmlFor="edit-cat-name" className="text-right">
                                 نام
                               </Label>
                               <Input id="edit-cat-name" defaultValue={selectedCategory?.name} className="col-span-3" />
                             </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                               <Label htmlFor="edit-cat-desc" className="text-right">
                                 توضیحات
                               </Label>
                               <Input id="edit-cat-desc" defaultValue={selectedCategory?.description} className="col-span-3" />
                             </div>
                           </div>
                           <DialogFooter>
                             <DialogClose asChild>
                               <Button type="button" variant="secondary" onClick={() => setSelectedCategory(null)}>لغو</Button>
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
             نمایش <strong>{categories.length}</strong> از <strong>{categories.length}</strong> دسته‌بندی
           </div>
           {/* Add Pagination component here if needed */}
         </CardFooter>
       </Card>
    </>
  );
}
