'use client';

import React from 'react';
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"; // Import Chart components

// Mock data for charts
const monthlyDownloads = [
  { month: 'فروردین', downloads: 4000 },
  { month: 'اردیبهشت', downloads: 3000 },
  { month: 'خرداد', downloads: 2000 },
  { month: 'تیر', downloads: 2780 },
  { month: 'مرداد', downloads: 1890 },
  { month: 'شهریور', downloads: 2390 },
  { month: 'مهر', downloads: 3490 },
];

const dailySignups = [
  { date: '۱۴۰۳/۰۳/۰۱', signups: 20 },
  { date: '۱۴۰۳/۰۳/۰۲', signups: 35 },
  { date: '۱۴۰۳/۰۳/۰۳', signups: 28 },
  { date: '۱۴۰۳/۰۳/۰۴', signups: 42 },
  { date: '۱۴۰۳/۰۳/۰۵', signups: 30 },
  { date: '۱۴۰۳/۰۳/۰۶', signups: 55 },
  { date: '۱۴۰۳/۰۳/۰۷', signups: 48 },
];

// Chart Configs
const barChartConfig = {
  downloads: {
    label: "دانلودها",
    color: "hsl(var(--chart-1))", // Use theme color
  },
} satisfies React.ComponentProps<typeof ChartContainer>["config"];

const lineChartConfig = {
   signups: {
     label: "ثبت‌نام‌ها",
     color: "hsl(var(--chart-2))", // Use another theme color
   },
 } satisfies React.ComponentProps<typeof ChartContainer>["config"];


export default function AdminAnalyticsPage() {
  return (
    <div className="grid flex-1 auto-rows-max gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
       <h1 className="text-2xl font-bold mb-4">آمار و گزارشات</h1>

       <div className="grid gap-4 md:grid-cols-2 md:gap-8">
         {/* Downloads Chart */}
          <Card>
             <CardHeader>
               <CardTitle>دانلودهای ماهانه</CardTitle>
               <CardDescription>نمودار تعداد دانلود دیتاست‌ها در ماه‌های اخیر.</CardDescription>
             </CardHeader>
             <CardContent>
               <ChartContainer config={barChartConfig} className="h-[250px] w-full">
                 <BarChart data={monthlyDownloads} margin={{ top: 5, right: 0, left: -15, bottom: 5 }}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
                   <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                   <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                   <ChartTooltip
                     cursor={false}
                     content={<ChartTooltipContent indicator="dashed" />}
                    />
                   <Bar dataKey="downloads" fill="var(--color-downloads)" radius={4} />
                 </BarChart>
               </ChartContainer>
             </CardContent>
           </Card>

         {/* Signups Chart */}
           <Card>
             <CardHeader>
               <CardTitle>ثبت‌نام‌های روزانه</CardTitle>
               <CardDescription>نمودار تعداد کاربران جدید ثبت‌نام شده در روزهای اخیر.</CardDescription>
             </CardHeader>
             <CardContent>
               <ChartContainer config={lineChartConfig} className="h-[250px] w-full">
                 <LineChart data={dailySignups} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(-5)} // Show only day/month part
                    />
                   <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                   <ChartTooltip
                     cursor={false}
                     content={<ChartTooltipContent hideLabel />}
                    />
                   <Line
                      type="monotone"
                      dataKey="signups"
                      stroke="var(--color-signups)"
                      strokeWidth={2}
                      dot={true}
                    />
                 </LineChart>
               </ChartContainer>
             </CardContent>
           </Card>
       </div>

        {/* Add more analytics cards or sections */}
         <Card>
             <CardHeader>
               <CardTitle>دیتاست‌های محبوب</CardTitle>
               <CardDescription>لیست دیتاست‌ها با بیشترین تعداد دانلود.</CardDescription>
             </CardHeader>
             <CardContent>
                {/* Placeholder for popular datasets list */}
                <p className="text-muted-foreground">گزارش دیتاست‌های محبوب به زودی اضافه خواهد شد.</p>
             </CardContent>
           </Card>
    </div>
  );
}
