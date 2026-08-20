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
  title: "Sync Retreat — Work Remotely. Explore India. | Workation Programs",
  description: "Premium workation retreats across India's most scenic locations — Varkala, Ladakh, Manali, Jaipur. 7-day and 14-day programs for remote workers, freelancers, founders, and corporate teams.",
  keywords: [
    "workation India",
    "remote work retreat India",
    "digital nomad India",
    "work from India retreat",
    "workation Varkala",
    "workation Ladakh",
    "workation Manali",
    "workation Jaipur",
    "freelancer retreat India",
    "corporate offsite India",
    "startup retreat India",
    "remote worker retreat",
    "scenic workation",
    "India workcation",
    "productivity retreat India",
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
    title: "Sync Retreat — Work Remotely. Explore India.",
    description: "Premium workation retreats across India's most scenic locations. 7-day & 14-day plans for remote workers, freelancers, and teams. Next retreat: Varkala, Kerala.",
    url: "https://india.syncretreat.com",
    siteName: "Sync Retreat",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Sync Retreat — Workation Programs Across India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sync Retreat — Work Remotely. Explore India.",
    description: "Premium workation retreats across India. 7-day & 14-day programs for remote workers, freelancers & teams.",
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
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
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
        <link rel="icon" href="/logo.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpeg" />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
