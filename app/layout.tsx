import type { Metadata } from "next";
import { inter, manrope, spaceGrotesk } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ClientEffects } from "@/components/layout/ClientEffects";
import { ApplicationModal } from "@/components/application/ApplicationModal";
import { TestModeBanner } from "@/components/layout/TestModeBanner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Shahrisabz Tibbiyot Texnikumi",
    "tibbiyot texnikumi",
    "hamshiralik",
    "farmatsiya",
    "feldsherlik",
    "tibbiyot ta'limi",
    "Shahrisabz",
  ],
  authors: [{ name: siteConfig.name }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  image: `${siteConfig.url}/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ipak Yuli ko'chasi, 36A-uy",
    addressLocality: "Shahrisabz",
    addressCountry: "UZ",
  },
  telephone: siteConfig.phone,
  foundingDate: "2023",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={`${inter.variable} ${manrope.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Asosiy kontentga o&apos;tish
        </a>
        <ClientEffects />
        <TestModeBanner />
        <Header />
        {children}
        <Footer />
        <ApplicationModal />
      </body>
    </html>
  );
}
