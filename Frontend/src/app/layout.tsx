import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vasto Supermarket",
  description: "Vasto Supermarket - Your one-stop online grocery shop. Browse fresh produce, pantry staples, household essentials, and more. Enjoy fast delivery and great prices on quality products for your home.",
  keywords: [
    "online grocery", 
    "supermarket", 
    "food delivery", 
    "fresh produce",
    "grocery delivery",
    "online shopping",
    "household essentials",
    "Vasto Supermarket"
  ],
  // openGraph: {
  //   title: "Vasto Supermarket - Online Grocery Delivery",
  //   description: "Shop for groceries online and get them delivered to your doorstep. Fresh produce, pantry items, and household essentials at competitive prices.",
  //   url: "https://vastosupermarket.com",
  //   siteName: "Vasto Supermarket",
  //   images: [
  //     {
  //       url: "/og-image.jpg",
  //       width: 800,
  //       height: 600,
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Vasto Supermarket - Online Grocery",
  //   description: "Your favorite groceries delivered fast",
  //   images: ['/og-image.jpg'], // Same as OG or specific Twitter image
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToastContainer position='top-center'/>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
