import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/providers/MotionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ["latin"],
  variable: '--font-merriweather',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Vizag Food Explorer",
  description: "Discovering Vizag's Best Eats — one plate at a time",
  keywords: ['food review', 'visakhapatnam', 'vizag', 'restaurants', 'food blogger', 'dining', 'food guide'],
  authors: [{ name: 'P. Kiran Kumar' }],
  creator: 'P. Kiran Kumar',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vizagfoodexplorer.com',
    title: 'Vizag Food Explorer',
    description: "Discovering Vizag's Best Eats — one plate at a time",
    siteName: 'Vizag Food Explorer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vizag Food Explorer',
    description: "Discovering Vizag's Best Eats — one plate at a time",
    creator: '@vizagfoodexplorer',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
