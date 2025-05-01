'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft } from 'lucide-react'; // Changed ArrowLeft to ChevronLeft for consistency
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox'; // Import Checkbox

// Mock data for categories and tags
const categories = ['جغرافیا', 'اقتصاد', 'آمار', 'حمل و نقل', 'گردشگری'];
const tags = ['ایران', 'کدپستی', 'قیمت', 'جمعیت', 'پرواز', 'خودرو'];


export default function AddDatasetPage() {
  // Add state and form handling logic here (e.g., using react-hook-form)

  return (
    <div className="mx-auto grid max-w-3xl flex-1 auto-rows-max gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/admin/datasets">
            <ChevronLeft className="h-4 w-4" /> {/* Changed icon */}
            <span className="sr-only">بازگشت به دیتاست‌ها</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          افزودن دیتاست جدید
        </h1>
        {/* Optional: Add badges or status indicators here */}
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
           {/* <Button variant="outline" size="sm">
              لغو
            </Button> */}
          <Button size="sm">ذخیره دیتاست</Button>
        </div>
      </div>
      <div className="grid gap-4 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات اصلی دیتاست</CardTitle>
            <CardDescription>
              نام، توضیحات و دسته‌بندی دیتاست را وارد کنید.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">نام دیتاست</Label>
                <Input
                  id="name"
                  type="text"
                  className="w-full"
                  placeholder="مثال: قیمت روز سکه"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">توضیحات</Label>
                <Textarea
                  id="description"
                  placeholder="توضیح مختصری درباره محتوای دیتاست بنویسید."
                  className="min-h-32"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="grid gap-3">
                    <Label htmlFor="category">دسته‌بندی</Label>
                    <Select dir="rtl">
                      <SelectTrigger id="category" aria-label="انتخاب دسته‌بندی">
                        <SelectValue placeholder="انتخاب دسته‌بندی" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                           <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                 <div className="grid gap-3">
                    <Label htmlFor="status">وضعیت</Label>
                    <Select dir="rtl" defaultValue="فعال">
                      <SelectTrigger id="status" aria-label="انتخاب وضعیت">
                        <SelectValue placeholder="انتخاب وضعیت" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="فعال">فعال</SelectItem>
                        <SelectItem value="غیرفعال">غیرفعال</SelectItem>
                        <SelectItem value="در دست بررسی">در دست بررسی</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              </div>
            </div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>فایل دیتاست</CardTitle>
             <CardDescription>
               فایل اصلی دیتاست (CSV, JSON, Excel) را بارگذاری کنید.
             </CardDescription>
          </CardHeader>
          <CardContent>
             {/* Placeholder for file upload component */}
             <div className="flex items-center justify-center w-full">
                 <Label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
                         <svg className="w-8 h-8 mb-4 text-muted-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                         </svg>
                         <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">برای بارگذاری کلیک کنید</span> یا فایل را بکشید و رها کنید</p>
                         <p className="text-xs text-muted-foreground">CSV, JSON, XLSX (حداکثر ۱۰ مگابایت)</p>
                     </div>
                     <Input id="dropzone-file" type="file" className="hidden" />
                 </Label>
             </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>تگ‌ها</CardTitle>
            <CardDescription>تگ‌های مرتبط با دیتاست را انتخاب یا وارد کنید.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
               {/* <Label htmlFor="tags">تگ‌ها (با کاما جدا کنید)</Label>
              <Input id="tags" type="text" placeholder="مثال: ایران, تهران, جمعیت" /> */}
               <Label>انتخاب تگ‌های موجود</Label>
               <div className="flex flex-wrap gap-2">
                 {tags.map((tag) => (
                   <div key={tag} className="flex items-center space-x-2 space-x-reverse">
                     <Checkbox id={`tag-${tag}`} />
                     <Label htmlFor={`tag-${tag}`} className="text-sm font-normal cursor-pointer">
                       {tag}
                     </Label>
                   </div>
                 ))}
               </div>
                 <div className="grid gap-3 mt-4">
                  <Label htmlFor="new-tags">افزودن تگ جدید (با کاما جدا کنید)</Label>
                  <Input id="new-tags" type="text" placeholder="مثال: منطقه شهرداری, کد اقتصادی" />
                 </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center justify-center gap-2 md:hidden">
         {/* <Button variant="outline" size="sm">
            لغو
          </Button> */}
        <Button size="sm">ذخیره دیتاست</Button>
      </div>
    </div>
  );
}
