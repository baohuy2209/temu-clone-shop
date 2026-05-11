import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import { getCurrentSession } from "@/actions/auth";
import { SanityLive } from "@/sanity/lib/live";
import HeaderCategorySelector from "@/components/layout/HeaderCategorySelector";
import Cart from "@/components/cart/cart";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Temu Clone || NBH",
  description: "Author Nguyen Bao Huy",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getCurrentSession();
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-background min-h-[125vh]`}
      >
        <Header user={user} categorySelector={<HeaderCategorySelector />} />
        {children}
        <Cart />
        <SanityLive />
      </body>
    </html>
  );
}
