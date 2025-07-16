import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TiaType – Grammar Improvement Tool",
  description: "AI-powered writing assistant for clean, correct long-form content.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black dark:bg-black dark:text-white`}
      >
        <Toaster position="top-right" />
        <Navbar />
        
        {children}
        
        <Footer />
      </body>
    </html>
  );
}

