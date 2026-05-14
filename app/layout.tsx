import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import { getCurrentSession } from "@/actions/auth";
import { SanityLive } from "@/sanity/lib/live";
import HeaderCategorySelector from "@/components/layout/HeaderCategorySelector";
import Cart from "@/components/cart/cart";
import Script from "next/script";
import "./globals.css";
import { Suspense } from "react";
import AnalyticsTracker from "@/components/layout/AnalyticsTracker";
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
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="88093007-ccaf-45aa-9190-45904651d254"
      />
      <body
        className={`${inter.className} antialiased bg-background min-h-[125vh]`}
      >
        <Header user={user} categorySelector={<HeaderCategorySelector />} />
        <Suspense>
          <AnalyticsTracker user={user} />
        </Suspense>
        {children}
        <Cart />
        <SanityLive />
      </body>
    </html>
  );
}
