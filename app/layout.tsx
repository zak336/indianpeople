import type { Metadata } from "next";
import { Inter, Playfair_Display, Outfit } from "next/font/google";
import { AuthProvider } from "@/lib/AuthContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
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
  icons: {
    icon: "/assets/icon.jpeg",
    apple: "/assets/icon.jpeg",
  },
};

export const viewport = {
  themeColor: "#c96e38",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/assets/icon.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/assets/icon.jpeg" />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
