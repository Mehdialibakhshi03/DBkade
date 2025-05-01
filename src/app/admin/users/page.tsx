'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle, ListFilter, MoreHorizontal, Trash2, Edit, UserCog, File, User } from 'lucide-react'; // Added User icon
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
import { Input } from '@/components/ui/input'; // Import Input
import { Label } from '@/components/ui/label'; // Import Label
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Import Select
import { useToast } from "@/hooks/use-toast"; // Import useToast
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog" // Import Alert Dialog


// Mock data for users - Added initial state management
const initialUsers = [
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

// Define User type based on mock data
type UserType = typeof initialUsers[0];

export default function AdminUsersPage() {
    const { toast } = useToast();
    const [users, setUsers] = React.useState<UserType[]>(initialUsers);
    const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState<UserType | null>(null);
    const [newUser, setNewUser] = React.useState({ name: '', email: '', role: 'کاربر عادی' });
    const [editUser, setEditUser] = React.useState<UserType | null>(null);

    // --- Handlers for Modals ---
    const handleOpenAddDialog = () => {
        setNewUser({ name: '', email: '', role: 'کاربر عادی' }); // Reset form
        setIsAddDialogOpen(true);
    };

    const handleOpenEditDialog = (user: UserType) => {
        setSelectedUser(user);
        setEditUser({ ...user }); // Copy user data for editing
        setIsEditDialogOpen(true);
    };

    const handleOpenViewDialog = (user: UserType) => {
        setSelectedUser(user);
        setIsViewDialogOpen(true);
    };

    const handleDialogClose = () => {
        setSelectedUser(null);
        setEditUser(null); // Clear edit state
        setIsAddDialogOpen(false);
        setIsEditDialogOpen(false);
        setIsViewDialogOpen(false);
    };

    // --- CRUD Operations (Mocked) ---
    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUser.name || !newUser.email) {
            toast({ title: "خطا", description: "نام و ایمیل کاربر الزامی است.", variant: "destructive" });
            return;
        }
        const newUserToAdd: UserType = {
            id: `u${Math.random().toString(36).substring(2, 7)}`, // Generate random ID
            ...newUser,
            status: 'فعال', // Default status
            joinDate: new Date().toLocaleDateString('fa-IR'), // Current date
            avatarUrl: null, // Default avatar
        };
        setUsers([newUserToAdd, ...users]); // Add to the beginning of the list
        toast({ title: "موفق", description: `کاربر '${newUser.name}' با موفقیت اضافه شد.` });
        handleDialogClose();
    };

    const handleEditUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editUser) return;
        setUsers(users.map(u => u.id === editUser.id ? editUser : u));
        toast({ title: "موفق", description: `اطلاعات کاربر '${editUser.name}' به‌روز شد.` });
        handleDialogClose();
    };

     const handleDeleteUser = (userId: string) => {
       const userToDelete = users.find(u => u.id === userId);
       if (!userToDelete) return;

       setUsers(users.filter(u => u.id !== userId));
       toast({ title: "حذف شد", description: `کاربر '${userToDelete.name}' حذف شد.`, variant: "destructive" });
       // No need to close dialogs here as confirmation is separate
     };

     const handleToggleStatus = (userId: string) => {
       setUsers(users.map(u => {
         if (u.id === userId) {
           const newStatus = u.status === 'فعال' ? 'مسدود' : 'فعال';
           toast({ title: "وضعیت تغییر کرد", description: `وضعیت کاربر '${u.name}' به ${newStatus} تغییر یافت.` });
           return { ...u, status: newStatus };
         }
         return u;
       }));
     };


  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
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
           {/* Add User Button */}
           <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
             <DialogTrigger asChild>
               <Button size="sm" className="h-7 gap-1" onClick={handleOpenAddDialog}>
                 <PlusCircle className="h-3.5 w-3.5" />
                 <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                   افزودن کاربر
                 </span>
               </Button>
             </DialogTrigger>
             <DialogContent className="sm:max-w-[425px]" dir="rtl">
                <DialogHeader>
                   <DialogTitle>افزودن کاربر جدید</DialogTitle>
                   <DialogDescription>اطلاعات کاربر جدید را وارد کنید.</DialogDescription>
                 </DialogHeader>
                 <form onSubmit={handleAddUser}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="add-user-name" className="text-right">نام</Label>
                        <Input
                            id="add-user-name"
                            value={newUser.name}
                            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                            placeholder="نام کامل"
                            className="col-span-3"
                            required
                         />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="add-user-email" className="text-right">ایمیل</Label>
                        <Input
                            id="add-user-email"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            placeholder="user@example.com"
                            className="col-span-3"
                            required
                        />
                      </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                         <Label htmlFor="add-user-role" className="text-right">نقش</Label>
                         <Select
                            dir="rtl"
                            value={newUser.role}
                            onValueChange={(value) => setNewUser({...newUser, role: value})}
                          >
                           <SelectTrigger id="add-user-role" className="col-span-3">
                             <SelectValue placeholder="انتخاب نقش" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="کاربر عادی">کاربر عادی</SelectItem>
                             <SelectItem value="ویرایشگر">ویرایشگر</SelectItem>
                             <SelectItem value="مدیر">مدیر</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={handleDialogClose}>لغو</Button>
                      </DialogClose>
                      <Button type="submit">افزودن کاربر</Button>
                    </DialogFooter>
                 </form>
             </DialogContent>
           </Dialog>
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
                          <AvatarImage src={user.avatarUrl || undefined} alt={user.name} data-ai-hint="user avatar placeholder"/>
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                       <span>{user.name}</span>
                     </div>
                   </TableCell>
                   <TableCell>{user.email}</TableCell>
                   <TableCell>{user.role}</TableCell>
                   <TableCell>
                     <Badge
                        variant={user.status === 'فعال' ? 'default' : (user.status === 'مسدود' ? 'destructive' : 'secondary')}
                        className="cursor-pointer"
                        onClick={() => handleToggleStatus(user.id)} // Add toggle functionality
                        title={`تغییر وضعیت به ${user.status === 'فعال' ? 'مسدود' : 'فعال'}`} // Tooltip for action
                     >
                       {user.status}
                     </Badge>
                   </TableCell>
                   <TableCell>{user.joinDate}</TableCell>
                   <TableCell>
                      <AlertDialog> {/* Wrap Dropdown and Dialogs in AlertDialog for delete confirmation */}
                          <Dialog open={isEditDialogOpen && selectedUser?.id === user.id} onOpenChange={setIsEditDialogOpen}>
                            <Dialog open={isViewDialogOpen && selectedUser?.id === user.id} onOpenChange={setIsViewDialogOpen}>
                                <DropdownMenu dir="rtl">
                                    <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>اقدامات</DropdownMenuLabel>
                                        <DialogTrigger asChild>
                                        <DropdownMenuItem onSelect={() => handleOpenEditDialog(user)}>
                                            <Edit className="h-3.5 w-3.5 ml-2" /> ویرایش نقش/وضعیت
                                        </DropdownMenuItem>
                                        </DialogTrigger>
                                        <DialogTrigger asChild>
                                            <DropdownMenuItem onSelect={() => handleOpenViewDialog(user)}>
                                            <UserCog className="h-3.5 w-3.5 ml-2" /> مشاهده جزئیات
                                            </DropdownMenuItem>
                                        </DialogTrigger>
                                        <DropdownMenuSeparator />
                                        <AlertDialogTrigger asChild>
                                            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onSelect={() => setSelectedUser(user)}>
                                            <Trash2 className="h-3.5 w-3.5 ml-2" /> حذف کاربر
                                            </DropdownMenuItem>
                                        </AlertDialogTrigger>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* View User Dialog */}
                                <DialogContent className="sm:max-w-[425px]" dir="rtl" onPointerDownOutside={handleDialogClose} onEscapeKeyDown={handleDialogClose}>
                                <DialogHeader>
                                    <DialogTitle>جزئیات کاربر: {selectedUser?.name}</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4 text-sm">
                                    {/* Display user details here */}
                                    <p><strong>نام:</strong> {selectedUser?.name}</p>
                                    <p><strong>ایمیل:</strong> {selectedUser?.email}</p>
                                    <p><strong>نقش:</strong> {selectedUser?.role}</p>
                                    <p><strong>وضعیت:</strong> {selectedUser?.status}</p>
                                    <p><strong>تاریخ عضویت:</strong> {selectedUser?.joinDate}</p>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                    <Button type="button" variant="secondary" onClick={handleDialogClose}>بستن</Button>
                                    </DialogClose>
                                </DialogFooter>
                                </DialogContent>
                            </Dialog>

                           {/* Edit User Dialog */}
                           <DialogContent className="sm:max-w-[425px]" dir="rtl" onPointerDownOutside={handleDialogClose} onEscapeKeyDown={handleDialogClose}>
                             <DialogHeader>
                               <DialogTitle>ویرایش کاربر: {editUser?.name}</DialogTitle>
                               <DialogDescription>نقش و وضعیت کاربر را تغییر دهید.</DialogDescription>
                             </DialogHeader>
                              <form onSubmit={handleEditUser}>
                                 <div className="grid gap-4 py-4">
                                   <div className="grid grid-cols-4 items-center gap-4">
                                     <Label htmlFor="edit-user-name" className="text-right">نام</Label>
                                     <Input id="edit-user-name" value={editUser?.name || ''} onChange={(e) => editUser && setEditUser({...editUser, name: e.target.value})} className="col-span-3" required />
                                   </div>
                                   <div className="grid grid-cols-4 items-center gap-4">
                                     <Label htmlFor="edit-user-email" className="text-right">ایمیل</Label>
                                     <Input id="edit-user-email" type="email" value={editUser?.email || ''} onChange={(e) => editUser && setEditUser({...editUser, email: e.target.value})} className="col-span-3" required />
                                   </div>
                                   <div className="grid grid-cols-4 items-center gap-4">
                                     <Label htmlFor="edit-user-role" className="text-right">نقش</Label>
                                     <Select dir="rtl" value={editUser?.role || ''} onValueChange={(value) => editUser && setEditUser({...editUser, role: value})}>
                                       <SelectTrigger id="edit-user-role" className="col-span-3">
                                         <SelectValue placeholder="انتخاب نقش" />
                                       </SelectTrigger>
                                       <SelectContent>
                                         <SelectItem value="کاربر عادی">کاربر عادی</SelectItem>
                                         <SelectItem value="ویرایشگر">ویرایشگر</SelectItem>
                                         <SelectItem value="مدیر">مدیر</SelectItem>
                                       </SelectContent>
                                     </Select>
                                   </div>
                                   <div className="grid grid-cols-4 items-center gap-4">
                                     <Label htmlFor="edit-user-status" className="text-right">وضعیت</Label>
                                     <Select dir="rtl" value={editUser?.status || ''} onValueChange={(value) => editUser && setEditUser({...editUser, status: value as 'فعال' | 'مسدود'})}>
                                       <SelectTrigger id="edit-user-status" className="col-span-3">
                                         <SelectValue placeholder="انتخاب وضعیت" />
                                       </SelectTrigger>
                                       <SelectContent>
                                         <SelectItem value="فعال">فعال</SelectItem>
                                         <SelectItem value="مسدود">مسدود</SelectItem>
                                       </SelectContent>
                                     </Select>
                                   </div>
                                 </div>
                                 <DialogFooter>
                                   <DialogClose asChild>
                                     <Button type="button" variant="secondary" onClick={handleDialogClose}>لغو</Button>
                                   </DialogClose>
                                   <Button type="submit">ذخیره تغییرات</Button>
                                 </DialogFooter>
                              </form>
                            </DialogContent>
                         </Dialog>

                         {/* Delete Confirmation Dialog */}
                         <AlertDialogContent dir="rtl">
                           <AlertDialogHeader>
                             <AlertDialogTitle>آیا مطمئن هستید؟</AlertDialogTitle>
                             <AlertDialogDescription>
                               این عمل قابل بازگشت نیست. کاربر "{selectedUser?.name}" برای همیشه حذف خواهد شد.
                             </AlertDialogDescription>
                           </AlertDialogHeader>
                           <AlertDialogFooter>
                             <AlertDialogCancel onClick={() => setSelectedUser(null)}>لغو</AlertDialogCancel>
                             <AlertDialogAction
                                className={buttonVariants({ variant: "destructive" })} // Apply destructive style
                                onClick={() => selectedUser && handleDeleteUser(selectedUser.id)}
                              >
                                بله، حذف کن
                              </AlertDialogAction>
                           </AlertDialogFooter>
                         </AlertDialogContent>
                      </AlertDialog>
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
