import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className=" bg-gradient-to-br from-blue-500 to-indigo-600">
          {children}
          <p className="p-4 w-full text-center opacity-50">Made by Syed</p>
        </main>
      </body>
    </html>
  );
}
