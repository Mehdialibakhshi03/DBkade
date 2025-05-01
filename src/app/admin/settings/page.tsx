'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch'; // Import Switch
import { Separator } from '@/components/ui/separator'; // Import Separator

export default function AdminSettingsPage() {
  // Add state and form handling logic here

  return (
    <div className="grid flex-1 auto-rows-max gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
       <h1 className="text-2xl font-bold mb-4">تنظیمات سیستم</h1>

       <div className="grid gap-8 lg:grid-cols-3">
         {/* Left Column - Form */}
         <div className="lg:col-span-2 grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>تنظیمات عمومی</CardTitle>
                <CardDescription>تنظیمات کلی مربوط به نمایش و عملکرد سایت.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="site-title">عنوان سایت</Label>
                  <Input id="site-title" type="text" defaultValue="دیتا اکسپلورر" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="admin-email">ایمیل مدیر</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@example.com" />
                </div>
                <div className="flex items-center justify-between space-x-2 space-x-reverse">
                   <Label htmlFor="maintenance-mode" className="flex flex-col space-y-1">
                     <span>حالت تعمیر و نگهداری</span>
                     <span className="font-normal leading-snug text-muted-foreground">
                       در صورت فعال بودن، سایت برای کاربران عادی غیرقابل دسترس خواهد بود.
                     </span>
                   </Label>
                   <Switch id="maintenance-mode" aria-label="حالت تعمیر و نگهداری" />
                 </div>
              </CardContent>
            </Card>

            <Card>
               <CardHeader>
                <CardTitle>تنظیمات API</CardTitle>
                 <CardDescription>مدیریت کلیدهای API و محدودیت‌های دسترسی.</CardDescription>
               </CardHeader>
               <CardContent className="grid gap-6">
                 <div className="grid gap-3">
                   <Label htmlFor="api-rate-limit">محدودیت تعداد درخواست (در دقیقه)</Label>
                   <Input id="api-rate-limit" type="number" defaultValue="100" />
                 </div>
                 <div className="flex items-center justify-between space-x-2 space-x-reverse">
                   <Label htmlFor="require-api-key" className="flex flex-col space-y-1">
                     <span>نیاز به کلید API برای دسترسی عمومی</span>
                   </Label>
                   <Switch id="require-api-key" defaultChecked aria-label="نیاز به کلید API" />
                 </div>
                 {/* Add section for managing API keys */}
                  <Separator />
                  <div className="grid gap-3">
                    <Label>مدیریت کلیدهای API</Label>
                    {/* Placeholder for API key management UI */}
                    <p className="text-sm text-muted-foreground">
                      در این بخش می‌توانید کلیدهای API را ایجاد، مشاهده و حذف کنید. (رابط کاربری در آینده اضافه می‌شود)
                    </p>
                    <Button variant="outline" size="sm" disabled>مدیریت کلیدها</Button>
                  </div>
               </CardContent>
             </Card>
         </div>

         {/* Right Column - Save Button */}
         <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
           <Card>
             <CardHeader>
               <CardTitle>ذخیره تغییرات</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-sm text-muted-foreground">
                 پس از اعمال تغییرات مورد نظر، روی دکمه ذخیره کلیک کنید.
               </p>
             </CardContent>
             <CardFooter className="border-t px-6 py-4">
               <Button>ذخیره تنظیمات</Button>
             </CardFooter>
           </Card>
         </div>
       </div>
    </div>
  );
}
