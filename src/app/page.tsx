'use client';

import React from 'react';
import Link from 'next/link';
import { Database, Search, Star, Download, Grid, BarChart, DollarSign, Car, Plane, MapPin, Calendar, DatabaseZap } from 'lucide-react'; // Added Calendar, DatabaseZap
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for popular databases - Added lastUpdate and recordCount
const popularDatabases = [
  {
    id: 'postal-codes',
    title: 'کدپستی شهرهای ایران',
    description: 'مجموعه کامل کدهای پستی ۱۰ رقمی تمام شهرها و روستاهای ایران به تفکیک استان',
    tags: ['جغرافیا', 'ایران', 'کدپستی'],
    downloads: 3764,
    lastUpdate: '۱۴۰۳/۰۱/۲۰', // Added
    recordCount: 148329, // Added
  },
  {
    id: 'iran-divisions',
    title: 'تقسیمات کشوری ایران',
    description: 'لیست کامل استان‌ها، شهرستان‌ها، بخش‌ها، شهرها و دهستان‌های ایران',
    tags: ['جغرافیا', 'ایران', 'تقسیمات کشوری'],
    downloads: 2510,
    lastUpdate: '۱۴۰۲/۱۱/۰۵', // Added
    recordCount: 78500, // Added
  },
  {
    id: 'city-coordinates',
    title: 'مختصات جغرافیایی شهرهای ایران',
    description: 'مختصات دقیق طول و عرض جغرافیایی مراکز شهرهای ایران',
    tags: ['جغرافیا', 'ایران', 'مختصات'],
    downloads: 1893,
    lastUpdate: '۱۴۰۲/۰۹/۱۵', // Added
    recordCount: 1400, // Added
  },
    {
    id: 'car-prices',
    title: 'قیمت روز خودرو',
    description: 'آخرین قیمت خودروهای داخلی و خارجی در بازار ایران',
    tags: ['اقتصاد', 'خودرو', 'قیمت'],
    downloads: 4123,
    lastUpdate: '۱۴۰۳/۰۳/۱۰', // Added
    recordCount: 350, // Added
  },
];

// Mock data for categories - Removed color and bgColor, they are now styled directly
const databaseCategories = [
  { name: 'جغرافیا و نقشه', icon: MapPin },
  { name: 'اقتصاد و بازار', icon: DollarSign },
  { name: 'آمار و جمعیت', icon: BarChart },
  { name: 'حمل و نقل', icon: Car },
  { name: 'گردشگری', icon: Plane },
  // Add more categories as needed
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header is removed from here, handled by layout.tsx */}

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-b from-background to-primary/5 overflow-hidden"> {/* Changed gradient */}
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5 pointer-events-none">
           {/* Position icons randomly */}
           <Database className="absolute top-[10%] left-[5%] h-16 w-16 text-primary animate-bounce-subtle" style={{ animationDelay: '0s' }} />
           <Database className="absolute top-[30%] right-[10%] h-12 w-12 text-primary animate-bounce-subtle" style={{ animationDelay: '0.5s' }} />
           <Database className="absolute bottom-[20%] left-[15%] h-20 w-20 text-primary animate-bounce-subtle" style={{ animationDelay: '1s' }} />
           <Database className="absolute bottom-[10%] right-[25%] h-10 w-10 text-primary animate-bounce-subtle" style={{ animationDelay: '1.5s' }} />
           <Database className="absolute top-[50%] left-[30%] h-14 w-14 text-primary animate-bounce-subtle" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">مرکز داده‌های ایران</h2>
          <p className="text-lg text-muted-foreground mb-8">
            دسترسی آسان و سریع به مجموعه‌ای غنی از داده‌های عمومی و تخصصی ایران
          </p>
          {/* Updated Search Input and Button */}
          <div className="flex max-w-xl mx-auto space-x-2 space-x-reverse">
            <Input
              type="search"
              placeholder="جستجو در میان دیتاست‌ها..."
              className="flex-grow h-12 pr-4 text-base rounded-lg shadow-md bg-card" // Changed background to card
            />
            <Button size="lg" className="h-12 px-6 rounded-lg"> {/* Added Search Button */}
              <Search className="w-5 h-5 ml-2" />
              جستجو
            </Button>
          </div>
        </div>
      </section>

       {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-semibold mb-8 text-center">
          <Grid className="w-6 h-6 inline-block text-primary mb-1 ml-2" />
          دسته‌بندی دیتاست‌ها
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {databaseCategories.map((category) => (
            <Link key={category.name} href={`/category/${category.name}`} passHref>
                {/* Updated category box styling with better hover */}
                <div className={`flex flex-col items-center justify-center p-4 rounded-lg border border-primary bg-primary/5 hover:bg-primary/10 hover:shadow-md transition-all duration-300 cursor-pointer group`}>
                  <category.icon className={`w-10 h-10 mb-2 text-primary group-hover:scale-110 transition-transform`} />
                  <span className={`text-sm font-medium text-primary`}>{category.name}</span>
                </div>
            </Link>
          ))}
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
            <Card key={db.id} className="hover:shadow-lg transition-shadow duration-300 flex flex-col bg-card"> {/* Ensure card background */}
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
              <CardContent className="flex-grow flex flex-col justify-between"> {/* Added flex-grow and flex for spacing */}
                <div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {db.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 ml-1.5" />
                      آخرین بروزرسانی: {db.lastUpdate}
                    </div>
                    <div className="flex items-center">
                      <DatabaseZap className="w-4 h-4 ml-1.5" />
                      تعداد رکورد: {db.recordCount.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                     <Download className="w-4 h-4 ml-1.5"/>
                     تعداد دانلود: {db.downloads.toLocaleString()}
                   </div>
                  </div>
                </div>
                 <Link href={`/database/${db.id}`} className="mt-auto block w-full"> {/* Added mt-auto */}
                    <Button variant="default" className="w-full"> {/* Changed variant to default */}
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

      {/* Footer is handled by layout.tsx */}
    </div>
  );
}
