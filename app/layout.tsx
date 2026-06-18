import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import HashScroll from "./components/HashScroll";
import Header from "./components/Header";
import ScrollProgress from "./components/ScrollProgress";
import SmoothScroll from "./components/SmoothScroll";

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
        className={`${plusJakartaSans.variable} font-sans antialiased`}
      >
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
        <Header />
        <HashScroll />
        {children}
      </body>
    </html>
  );
}