import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import MobileSidebar from "./components/MobileSidebar";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mahmoud Saeed - Developer Portfolio",
  description: "Frontend Developer, Backend Architect, Zid & Salla Theme Specialist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased cursor-none`}
      >
        <CustomCursor />
        <MobileSidebar />
        {children}
      </body>
    </html>
  );
}