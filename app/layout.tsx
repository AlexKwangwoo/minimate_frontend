import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TostifyAlert } from "@/components/TostifyAlert/TostifyAlert";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Minimate",
    default: "Minimate",
  },
  description: "Enjoy Your Social Life",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <TostifyAlert />
      </body>
    </html>
  );
}
