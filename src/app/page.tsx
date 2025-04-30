'use client';

import React from 'react';
import Link from 'next/link';
import { Database, Search, Star, Download, Grid, BarChart, DollarSign, Car, Plane, MapPin } from 'lucide-react';
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

// Mock data for categories
const databaseCategories = [
  { name: 'جغرافیا و نقشه', icon: MapPin, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { name: 'اقتصاد و بازار', icon: DollarSign, color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { name: 'آمار و جمعیت', icon: BarChart, color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
  { name: 'حمل و نقل', icon: Car, color: 'text-red-500', bgColor: 'bg-red-50' },
  { name: 'گردشگری', icon: Plane, color: 'text-purple-500', bgColor: 'bg-purple-50' },
  // Add more categories as needed
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
      <section className="relative py-20 px-4 text-center bg-gradient-to-b from-background to-secondary/30 overflow-hidden">
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
          <div className="relative max-w-xl mx-auto">
            <Input
              type="search"
              placeholder="جستجو در میان دیتاست‌ها..."
              className="w-full h-12 pl-10 pr-4 text-base rounded-full shadow-md bg-background" // Ensure background for visibility
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
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
                <div className={`flex flex-col items-center justify-center p-4 rounded-lg border ${category.bgColor} hover:shadow-md transition-shadow cursor-pointer group`}>
                  <category.icon className={`w-10 h-10 mb-2 ${category.color} group-hover:scale-110 transition-transform`} />
                  <span className={`text-sm font-medium ${category.color.replace('text-','text-')}`}>{category.name}</span>
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

       {/* Removed simple Footer, now handled by RootLayout */}

    </div>
  );
}
