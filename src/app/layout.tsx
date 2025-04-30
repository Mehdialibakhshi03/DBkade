import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google'; // Using Geist as per project setup
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Link from 'next/link';
import { Database, Facebook, Twitter, Linkedin, Github } from 'lucide-react'; // Import icons for footer

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Data Explorer',
  description: 'Explore and download datasets',
};

const AppFooter = () => {
  return (
    <footer className="bg-card border-t mt-16 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 space-x-reverse mb-4">
              <Database className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">دیتا اکسپلورر</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              مرکز داده‌های ایران برای دسترسی آسان و سریع به اطلاعات.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="font-semibold mb-4">لینک‌های سریع</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">درباره ما</Link></li>
              <li><Link href="/datasets" className="text-muted-foreground hover:text-primary">دیتاست‌ها</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">تماس با ما</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary">سوالات متداول</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="font-semibold mb-4">قانونی</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary">شرایط استفاده</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">حریم خصوصی</Link></li>
              <li><Link href="/api-docs" className="text-muted-foreground hover:text-primary">مستندات API</Link></li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h3 className="font-semibold mb-4">ما را دنبال کنید</h3>
            <div className="flex space-x-4 space-x-reverse">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Github className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} دیتا اکسپلورر. تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  );
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning={true}>
      {/* Removed font variables from body, kept base styles */}
      {/* Added suppressHydrationWarning to mitigate issues with browser extensions modifying the DOM */}
      <body className="font-sans antialiased">
        <div className="flex flex-col min-h-screen">
           <main className="flex-grow">
             {children}
           </main>
           <AppFooter /> {/* Add the new footer */}
         </div>
        <Toaster />
      </body>
    </html>
  );
}
