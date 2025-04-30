'use client';

import React from 'react';
import Link from 'next/link';
import { Database, Search, Star, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for popular databases
const popularDatabases = [
  {
    id: 'postal-codes',
    title: 'کدپستی شهرهای ایران',
    description: 'مجموعه کامل کدهای پستی ۱۰ رقمی تمام شهرها و روستاهای ایران به تفکیک استان',
    tags: ['جغرافیا', 'ایران', 'کدپستی'],
    downloads: 3764,
  },
  {
    id: 'iran-divisions',
    title: 'تقسیمات کشوری ایران',
    description: 'لیست کامل استان‌ها، شهرستان‌ها، بخش‌ها، شهرها و دهستان‌های ایران',
    tags: ['جغرافیا', 'ایران', 'تقسیمات کشوری'],
    downloads: 2510,
  },
  {
    id: 'city-coordinates',
    title: 'مختصات جغرافیایی شهرهای ایران',
    description: 'مختصات دقیق طول و عرض جغرافیایی مراکز شهرهای ایران',
    tags: ['جغرافیا', 'ایران', 'مختصات'],
    downloads: 1893,
  },
    {
    id: 'car-prices',
    title: 'قیمت روز خودرو',
    description: 'آخرین قیمت خودروهای داخلی و خارجی در بازار ایران',
    tags: ['اقتصاد', 'خودرو', 'قیمت'],
    downloads: 4123,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Database className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-xl font-bold">دیتا اکسپلورر</h1>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button>
              ورود / ثبت‌نام
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">مرکز داده‌های ایران</h2>
          <p className="text-lg text-muted-foreground mb-8">
            دسترسی آسان و سریع به مجموعه‌ای غنی از داده‌های عمومی و تخصصی ایران
          </p>
          <div className="relative max-w-xl mx-auto">
            <Input
              type="search"
              placeholder="جستجو در میان دیتاست‌ها..."
              className="w-full h-12 pl-10 pr-4 text-base rounded-full shadow-md"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Popular Databases Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-semibold mb-8 text-center">
          <Star className="w-6 h-6 inline-block text-yellow-500 mb-1 ml-2" />
          محبوب‌ترین دیتاست‌ها
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDatabases.map((db) => (
            <Card key={db.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <Database className="w-5 h-5 mr-2 text-primary" />
                  <CardTitle className="text-lg">
                    <Link href={`/database/${db.id}`} className="hover:text-primary">
                        {db.title}
                    </Link>
                  </CardTitle>
                </div>
                <CardDescription className="h-16 overflow-hidden text-ellipsis">
                    {db.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex flex-wrap gap-1">
                    {db.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                   <div className="flex items-center text-muted-foreground">
                     <Download className="w-4 h-4 ml-1"/>
                     {db.downloads.toLocaleString()}
                   </div>
                </div>
                 <Link href={`/database/${db.id}`} className="mt-4 block w-full">
                    <Button variant="outline" className="w-full">
                        مشاهده جزئیات
                    </Button>
                 </Link>
              </CardContent>
            </Card>
          ))}
        </div>
          <div className="text-center mt-10">
            <Button size="lg">
                مشاهده همه دیتاست‌ها
            </Button>
          </div>
      </section>

       {/* Footer */}
       <footer className="border-t mt-12 py-6">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
           &copy; {new Date().getFullYear()} دیتا اکسپلورر. تمامی حقوق محفوظ است.
         </div>
       </footer>
    </div>
  );
}
