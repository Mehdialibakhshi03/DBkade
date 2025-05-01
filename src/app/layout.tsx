import type { Metadata } from 'next';
// Use Inter as a reliable fallback or replacement for Geist
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans', // Assign to CSS variable
});


export const metadata: Metadata = {
  title: 'Data Explorer',
  description: 'مرکز داده‌های ایران',
};

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
          {children}
        <Toaster />
      </body>
    </html>
  );
}
