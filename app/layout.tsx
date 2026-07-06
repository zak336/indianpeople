import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sync Retreat - 14-Day Execution Program in Leh, Ladakh | Founder Retreat",
  description: "Join founding teams at Sync Retreat in Leh, Ladakh for a structured 14-day execution program. Commercial-grade internet, ergonomic workstations, and mentor-led accountability sessions at 3,524m altitude.",
  keywords: [
    "founder retreat",
    "startup retreat",
    "execution program",
    "Leh Ladakh",
    "coworking retreat",
    "founder program",
    "startup acceleration",
    "team execution",
    "remote work retreat",
    "mountain retreat",
    "India startup retreat",
    "tech retreat",
    "productivity retreat",
  ],
  authors: [{ name: "Sync Retreat" }],
  creator: "Sync Retreat",
  publisher: "Sync Retreat",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://india.syncretreat.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sync Retreat - 14-Day Execution Program in Leh, Ladakh",
    description: "Join founding teams at 3,524m altitude for structured execution blocks, mentor reviews, and customer validation. Limited to 15 seats per cohort.",
    url: "https://india.syncretreat.com",
    siteName: "Sync Retreat",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Sync Retreat - Founder Program in Leh, Ladakh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sync Retreat - 14-Day Execution Program in Leh, Ladakh",
    description: "Join founding teams at 3,524m altitude for structured execution blocks, mentor reviews, and customer validation. Limited to 15 seats per cohort.",
    images: ["/assets/hero.jpeg"],
    creator: "@syncretreat",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/assets/hero.jpeg" />
        <meta name="theme-color" content="#c96e38" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
