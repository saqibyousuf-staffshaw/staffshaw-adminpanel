import LayoutWrapper from "@/components/LayoutWrapper";
import { Geist_Mono, Inter } from "next/font/google";
import localFont from 'next/font/local';
import Script from "next/script";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Local font: Switzer
const switzer = localFont({
  variable: '--font-switzer',
  src: [
    {
      path: './fonts/Switzer-Extralight.woff',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/Switzer-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    // {
    //   path: './fonts/Switzer-Bold.woff2',
    //   weight: '700',
    //   style: 'normal',
    // },
  ],
  display: 'swap',
});

export const metadata = {
  title: {
    default: "Staffshaw",
    template: "%s | Staffshaw",
  },
  description: "Staffshaw | One-Stop Solution For All Your Business Needs",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} ${switzer.variable} antialiased overflow-x-hidden`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster position="top-center" /> {/* ✅ Needed for toasts */}
      </body>
      <Script
        src="https://unpkg.com/aos@2.3.1/dist/aos.js"
        strategy="afterInteractive"
      />
    </html>
  );
}
