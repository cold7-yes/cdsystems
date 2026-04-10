import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { AuraBackground } from "../components/AuraBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "CD Systems | Automation Studio for Growing Businesses",
  description:
    "We build custom automation systems that eliminate the manual work costing your business time, money, and momentum.",
  metadataBase: new URL("https://cdsystems.dev"),
  openGraph: {
    title: "CD Systems | Automation Studio for Growing Businesses",
    description:
      "We build custom automation systems that eliminate the manual work costing your business time, money, and momentum.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <AuraBackground />
        {children}
      </body>
    </html>
  );
}
