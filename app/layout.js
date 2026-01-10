import { Geist, Geist_Mono } from "next/font/google";
import Footer from "./components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Admin-Dashboard",
    template: "%s | Admin-Dashboard",
  },
  description:
    "Admin-Dashboard is a powerful admin panel to manage users, products, orders, and analytics efficiently.",
  keywords: [
    "Admin Dashboard",
    "Admin Panel",
    "Dashboard",
    "Next.js Admin",
    "Web Admin Panel",
  ],
  authors: [{ name: "Butt Networks" }],
  creator: "Butt Networks",
  icons: {
    icon: "/butt.png",
  },
  openGraph: {
    title: "Admin-Dashboard",
    description:
      "Modern and responsive Admin Dashboard built with Next.js for managing applications efficiently.",
    url: "https://your-domain.com", // change to your real domain
    siteName: "Admin-Dashboard",
    images: [
      {
        url: "/butt.png",
        width: 512,
        height: 512,
        alt: "Admin Dashboard Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Admin-Dashboard",
    description:
      "A modern admin dashboard built with Next.js for complete application control.",
    images: ["/butt.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
