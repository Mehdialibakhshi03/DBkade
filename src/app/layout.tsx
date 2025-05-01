import type { Metadata } from 'next';
// Use Inter as a reliable fallback or replacement for Geist
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Database } from 'lucide-react';

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans', // Assign to CSS variable
});


export const metadata: Metadata = {
  title: 'Data Explorer',
  description: 'مرکز داده‌های ایران',
};

// Footer component
function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Call to Action Banner */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 mb-10 text-center">
            <h3 className="text-2xl font-bold mb-3">درخواست دیتاست جدید دارید؟</h3>
            <p className="mb-6">
                اگر دیتاست خاصی مدنظرتان است که در مجموعه ما پیدا نکردید، به ما اطلاع دهید.
            </p>
            <Button variant="secondary" size="lg">ثبت درخواست دیتاست</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">دیتا اکسپلورر</h4>
            <p className="text-sm">
              دسترسی آسان و سریع به مجموعه‌ای غنی از داده‌های عمومی و تخصصی ایران.
            </p>
            <div className="flex space-x-4 space-x-reverse mt-4">
              {/* Add social media icons/links here if needed */}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">لینک‌های مفید</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/datasets" className="hover:text-white">همه دیتاست‌ها</Link></li>
              <li><Link href="/categories" className="hover:text-white">دسته‌بندی‌ها</Link></li>
              <li><Link href="/api-docs" className="hover:text-white">مستندات API</Link></li>
              <li><Link href="/pricing" className="hover:text-white">پلن‌های قیمتی</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">منابع</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-white">وبلاگ</Link></li>
              <li><Link href="/tutorials" className="hover:text-white">آموزش‌ها</Link></li>
              <li><Link href="/faq" className="hover:text-white">سوالات متداول</Link></li>
              <li><Link href="/support" className="hover:text-white">پشتیبانی</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">حقوقی</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="hover:text-white">شرایط استفاده</Link></li>
              <li><Link href="/privacy" className="hover:text-white">حریم خصوصی</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} دیتا اکسپلورر. تمام حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Use the Inter font variable
    // Added suppressHydrationWarning to mitigate issues with browser extensions modifying the DOM
    <html lang="fa" dir="rtl" className={`${inter.variable}`} suppressHydrationWarning>
      {/* Apply font-sans which uses the --font-sans variable */}
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning> {/* Apply background and text colors, add suppressHydrationWarning */}
        <div className="flex flex-col min-h-screen">
           {/* Global Header removed - will be added in specific layouts or pages */}

           <main className="flex-grow">
             {children}
           </main>
           <Footer /> {/* Add Footer */}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
