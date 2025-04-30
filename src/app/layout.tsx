import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google'; // Keeping Geist as per error context
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// If Vazirmatn was intended, it should be imported and used here instead of Geist
// import { Vazirmatn } from 'next/font/google';
// const vazirmatn = Vazirmatn({ subsets: ['arabic', 'latin'], variable: '--font-vazirmatn' });

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply font variables directly to html tag and ensure no extra whitespace
    <html lang="fa" dir="rtl" className={`${geistSans.variable} ${geistMono.variable}`}>
      {/* Removed font variables from body, kept base styles */}
      {/* Added suppressHydrationWarning to mitigate issues with browser extensions modifying the DOM */}
      <body className="font-sans antialiased" suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
