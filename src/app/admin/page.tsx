'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart, Users, Database, DollarSign } from 'lucide-react';

// Mock data for dashboard cards
const dashboardStats = [
  { title: 'مجموع دیتاست‌ها', value: '150', icon: Database, change: '+10%', changeType: 'positive' },
  { title: 'مجموع کاربران', value: '1,250', icon: Users, change: '+5%', changeType: 'positive' },
  { title: 'دانلودهای ماه', value: '5,800', icon: BarChart, change: '-2%', changeType: 'negative' },
  { title: 'درآمد ماه (تومان)', value: '۱۲,۵۰۰,۰۰۰', icon: DollarSign, change: '+15%', changeType: 'positive' },
];

export default function AdminDashboard() {
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <h1 className="text-2xl font-bold mb-4">داشبورد مدیریت</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} نسبت به ماه گذشته
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Add more dashboard components here, like recent activity, charts, etc. */}
       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-1">
           <Card>
             <CardHeader>
               <CardTitle>فعالیت‌های اخیر</CardTitle>
               <CardDescription>لیست آخرین رویدادها در پنل.</CardDescription>
             </CardHeader>
             <CardContent>
               {/* Placeholder for recent activity feed */}
               <p className="text-muted-foreground">هنوز فعالیتی ثبت نشده است.</p>
               {/* Example Item:
               <div className="flex items-center justify-between text-sm py-2 border-b last:border-0">
                 <span>کاربر 'example@user.com' ثبت نام کرد.</span>
                 <span className="text-muted-foreground">۲ ساعت پیش</span>
               </div>
               */}
             </CardContent>
           </Card>
         </div>
    </div>
  );
}
