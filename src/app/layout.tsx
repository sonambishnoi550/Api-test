import type { Metadata } from "next";
import "./globals.css";
import React, { Suspense } from "react";
export const metadata: Metadata = {
  title: "API test",
  description: "lorem ipsum dolor sit amet",
  openGraph: {
    title: "API test",
    description: "lorem ipsum dolor sit amet ",
    images: [
      {
        url: "/meta-img.png",
        width: 900,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
