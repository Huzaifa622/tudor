import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { Poppins } from 'next/font/google'
import { Toaster } from "react-hot-toast";

const poppins =  Poppins({weight:"400" , subsets:["latin"]})


export const metadata: Metadata = {
  title: "Tutor",
  description: "Tutor App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
