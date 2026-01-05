import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
export const metadata = {
  title: "Order Premium Products | WhatsApp Store",
  description:
    "Order premium products instantly on WhatsApp. Fast delivery, best prices, and trusted service.",
  openGraph: {
    title: "Order Premium Products | WhatsApp Store",
    description:
      "Order premium products instantly on WhatsApp. Fast delivery, best prices, and trusted service.",
    url: "https://your-site.vercel.app",
    siteName: "WhatsApp Store",
    images: [
      {
        url: "https://your-site.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Order Now on WhatsApp",
      },
    ],
    type: "website",
  },
};

const inter = Inter({ subsets: ['latin'] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
