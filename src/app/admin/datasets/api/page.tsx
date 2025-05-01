'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle, ListFilter, MoreHorizontal, Trash2, Edit, Key, Copy, Eye, File } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast"; // Import useToast

// Mock data for API Keys
const apiKeys = [
  {
    id: 'ak_123xyz',
    name: 'اپلیکیشن موبایل',
    keyPrefix: 'sk_live_...',
    createdDate: '۱۴۰۳/۰۲/۱۵',
    lastUsed: '۱۴۰۳/۰۳/۱۰',
    requests: 12500,
    status: 'فعال',
  },
  {
    id: 'ak_abc789',
    name: 'سرور آنالیتیکس',
    keyPrefix: 'pk_test_...',
    createdDate: '۱۴۰۲/۱۱/۰۱',
    lastUsed: '۱۴۰۳/۰۱/۲۰',
    requests: 5800,
    status: 'فعال',
  },
   {
    id: 'ak_def456',
    name: 'پروژه تست',
    keyPrefix: 'sk_test_...',
    createdDate: '۱۴۰۳/۰۱/۰۵',
    lastUsed: null,
    requests: 0,
    status: 'غیرفعال',
  },
  // Add more mock API keys
];

export default function AdminApiKeysPage() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false);
  const [selectedApiKey, setSelectedApiKey] = React.useState<typeof apiKeys[0] | null>(null);
  const [newKeyName, setNewKeyName] = React.useState('');
  const [generatedKey, setGeneratedKey] = React.useState<string | null>(null); // State for the generated key

  // Handler for creating a new API key (mock implementation)
  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast({ title: "خطا", description: "لطفاً نامی برای کلید API وارد کنید.", variant: "destructive" });
      return;
    }
    // Simulate key generation
    const newKey = `sk_live_${Math.random().toString(36).substring(2, 15)}`;
    setGeneratedKey(newKey);
    // In a real app, you'd save the key name and metadata, but only show the full key once.
    console.log(`Generated key for "${newKeyName}": ${newKey}`);
    // Reset form and keep dialog open to show the key
    setNewKeyName('');
    // Don't close the dialog automatically: setIsAddDialogOpen(false);
    toast({ title: "کلید API ایجاد شد", description: "این کلید فقط یک بار نمایش داده می‌شود. آن را در جای امنی ذخیره کنید." });
  };

   // Handler for copying the key
  const copyKeyToClipboard = () => {
    if (!generatedKey) return;
    navigator.clipboard.writeText(generatedKey)
      .then(() => {
        toast({ title: "کپی شد!", description: "کلید API در کلیپ‌بورد کپی شد." });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({ title: "خطا", description: "امکان کپی در کلیپ‌بورد وجود ندارد.", variant: "destructive" });
      });
  };

   // Handler for closing the Add dialog and resetting generated key state
  const handleAddDialogClose = (open: boolean) => {
    if (!open) {
      setGeneratedKey(null); // Clear the generated key when closing
      setNewKeyName('');
    }
    setIsAddDialogOpen(open);
  };


  // Handler for viewing the key details (doesn't show the full key again for security)
  const handleViewKey = (key: typeof apiKeys[0]) => {
    setSelectedApiKey(key);
    setIsViewDialogOpen(true);
  };

  // Handler for deleting a key (mock)
  const handleDeleteKey = (keyId: string) => {
     console.log(`Deleting key: ${keyId}`);
     // Add API call to delete the key
     toast({ title: "کلید API حذف شد", description: `کلید با شناسه ${keyId} حذف گردید.`, variant: "destructive"});
     // Update state to remove the key from the list (replace with actual data fetching)
     // setApiKeys(prev => prev.filter(k => k.id !== keyId));
  }

  // Handler for toggling key status (mock)
  const handleToggleStatus = (keyId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'فعال' ? 'غیرفعال' : 'فعال';
    console.log(`Toggling status for key ${keyId} to ${newStatus}`);
    // Add API call to update the status
    toast({ title: "وضعیت کلید تغییر کرد", description: `وضعیت کلید با شناسه ${keyId} به ${newStatus} تغییر یافت.`});
     // Update state (replace with actual data fetching)
     // setApiKeys(prev => prev.map(k => k.id === keyId ? { ...k, status: newStatus } : k));
  }


  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
       <div className="flex items-center">
         <h1 className="text-xl font-semibold">مدیریت کلیدهای API</h1>
         <div className="ml-auto flex items-center gap-2 mr-auto">
            <Button size="sm" variant="outline" className="h-7 gap-1">
             <File className="h-3.5 w-3.5" />
             <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
               خروجی
             </span>
           </Button>
           <Dialog open={isAddDialogOpen} onOpenChange={handleAddDialogClose}>
              <DialogTrigger asChild>
                 <Button size="sm" className="h-7 gap-1">
                   <PlusCircle className="h-3.5 w-3.5" />
                   <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                     ایجاد کلید API
                   </span>
                 </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]" dir="rtl">
                 <DialogHeader>
                   <DialogTitle>ایجاد کلید API جدید</DialogTitle>
                   <DialogDescription>
                     یک نام برای کلید خود انتخاب کنید. این نام به شما کمک می‌کند تا کلیدها را در آینده شناسایی کنید.
                   </DialogDescription>
                 </DialogHeader>
                 {generatedKey ? (
                    // Show the generated key
                    <div className="py-4 space-y-4">
                        <p className="text-sm text-muted-foreground">
                           کلید API شما ایجاد شد. این کلید فقط یک بار نمایش داده می‌شود. آن را کپی کرده و در جای امنی ذخیره کنید.
                        </p>
                        <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-3 bg-muted">
                            <Input
                              id="generated-key"
                              readOnly
                              value={generatedKey}
                              className="flex-grow font-mono text-sm"
                             />
                            <Button variant="ghost" size="icon" onClick={copyKeyToClipboard}>
                              <Copy className="h-4 w-4" />
                              <span className="sr-only">کپی کلید</span>
                            </Button>
                        </div>
                    </div>
                 ) : (
                    // Show the form to create a key
                    <div className="grid gap-4 py-4">
                       <div className="grid grid-cols-4 items-center gap-4">
                         <Label htmlFor="key-name" className="text-right">
                           نام کلید
                         </Label>
                         <Input
                           id="key-name"
                           value={newKeyName}
                           onChange={(e) => setNewKeyName(e.target.value)}
                           placeholder="مثال: پروژه وبسایت اصلی"
                           className="col-span-3"
                          />
                       </div>
                     </div>
                 )}
                 <DialogFooter>
                   <DialogClose asChild>
                     <Button type="button" variant="secondary">
                       {generatedKey ? "بستن" : "لغو"}
                      </Button>
                   </DialogClose>
                   {!generatedKey && ( // Only show Create button if key hasn't been generated yet
                      <Button type="button" onClick={handleCreateKey}>ایجاد کلید</Button>
                   )}
                 </DialogFooter>
               </DialogContent>
            </Dialog>
         </div>
       </div>

       <Card>
         <CardHeader>
           <CardTitle>کلیدهای API</CardTitle>
           <CardDescription>
             مدیریت دسترسی برنامه‌ها و سرویس‌ها به API دیتاست‌ها.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead>نام</TableHead>
                 <TableHead>پیشوند کلید</TableHead>
                 <TableHead>تاریخ ایجاد</TableHead>
                 <TableHead>آخرین استفاده</TableHead>
                 <TableHead>تعداد درخواست</TableHead>
                 <TableHead>وضعیت</TableHead>
                 <TableHead>
                   <span className="sr-only">اقدامات</span>
                 </TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {apiKeys.map((key) => (
                 <TableRow key={key.id}>
                   <TableCell className="font-medium">{key.name}</TableCell>
                   <TableCell className="font-mono text-xs">{key.keyPrefix}******</TableCell>
                   <TableCell>{key.createdDate}</TableCell>
                   <TableCell>{key.lastUsed || 'هرگز'}</TableCell>
                   <TableCell>{key.requests.toLocaleString()}</TableCell>
                   <TableCell>
                     <Badge variant={key.status === 'فعال' ? 'default' : 'destructive'}>
                       {key.status}
                     </Badge>
                   </TableCell>
                   <TableCell>
                      <Dialog open={isViewDialogOpen && selectedApiKey?.id === key.id} onOpenChange={(open) => { if (!open) setSelectedApiKey(null); setIsViewDialogOpen(open); }}>
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
                                 <DropdownMenuItem onSelect={() => handleViewKey(key)}>
                                   <Eye className="h-3.5 w-3.5 ml-2" /> مشاهده جزئیات
                                 </DropdownMenuItem>
                              </DialogTrigger>
                             <DropdownMenuItem onClick={() => handleToggleStatus(key.id, key.status)}>
                               {key.status === 'فعال' ? 'غیرفعال کردن' : 'فعال کردن'}
                             </DropdownMenuItem>
                             <DropdownMenuSeparator />
                             <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleDeleteKey(key.id)}>
                               <Trash2 className="h-3.5 w-3.5 ml-2" /> حذف کلید
                             </DropdownMenuItem>
                           </DropdownMenuContent>
                         </DropdownMenu>
                          <DialogContent className="sm:max-w-[425px]" dir="rtl">
                           <DialogHeader>
                             <DialogTitle>جزئیات کلید: {selectedApiKey?.name}</DialogTitle>
                           </DialogHeader>
                           <div className="grid gap-4 py-4 text-sm">
                              <div className="flex justify-between">
                                 <span className="text-muted-foreground">شناسه:</span>
                                 <span>{selectedApiKey?.id}</span>
                              </div>
                              <div className="flex justify-between">
                                 <span className="text-muted-foreground">پیشوند:</span>
                                 <span className="font-mono text-xs">{selectedApiKey?.keyPrefix}******</span>
                              </div>
                               <div className="flex justify-between">
                                 <span className="text-muted-foreground">تاریخ ایجاد:</span>
                                 <span>{selectedApiKey?.createdDate}</span>
                              </div>
                              <div className="flex justify-between">
                                 <span className="text-muted-foreground">آخرین استفاده:</span>
                                 <span>{selectedApiKey?.lastUsed || 'هرگز'}</span>
                              </div>
                               <div className="flex justify-between">
                                 <span className="text-muted-foreground">تعداد درخواست:</span>
                                 <span>{selectedApiKey?.requests.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">وضعیت:</span>
                                 <Badge variant={selectedApiKey?.status === 'فعال' ? 'default' : 'destructive'}>
                                   {selectedApiKey?.status}
                                 </Badge>
                              </div>
                           </div>
                           <DialogFooter>
                              <DialogClose asChild>
                               <Button type="button" variant="secondary">بستن</Button>
                             </DialogClose>
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
             نمایش <strong>{apiKeys.length}</strong> از <strong>{apiKeys.length}</strong> کلید API
           </div>
           {/* Add Pagination component here if needed */}
         </CardFooter>
       </Card>
    </div>
  );
}
