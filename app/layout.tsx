import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Judson, Poppins } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "@/providers/session-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Easy Tax Return | Online Tax Preparation and Filing",
  description:
    "Easy Tax Return offers easy, secure, and accurate online tax preparation and filing services for individuals, firms, and companies. Get expert assistance and maximize your refunds.",
  keywords:
    "tax return, Bangladesh, online tax filing, tax preparation, income tax, e-filing, tax services",
  authors: [{ name: "Easy Tax Return" }],
  creator: "Easy Tax Return",
  publisher: "Easy Tax Return",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.etaxreturn.com.bd"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "bn-BD": "/bn-BD",
    },
  },
  openGraph: {
    title: "Easy Tax Return | Simplify Your Tax Filing",
    description:
      "Streamline your tax preparation and filing with Easy Tax Return. Expert guidance, maximum refunds, and peace of mind.",
    url: "https://www.etaxreturn.com.bd",
    siteName: "Easy Tax Return",
    images: [
      {
        url: "https://www.etaxreturn.com.bd/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Easy Tax Return - Online Tax Filing Made Easy",
      },
    ],
    locale: "en_US",
    type: "website",
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
  twitter: {
    card: "summary_large_image",
    title: "Easy Tax Return | Expert Online Tax Services",
    description:
      "Simplify your tax filing process with Easy Tax Return. Accurate, secure, and efficient online tax preparation and submission.",
    creator: "@etaxreturnbd",
    images: ["https://www.etaxreturn.com.bd/twitter-image.jpg"],
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "Finance",
};

const bodyFont = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "500", "600"],
  variable: "--font-poppins",
});

// Font for titles
const titleFont = Judson({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-judson",
  weight: ["700", "400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${titleFont.variable}`}>
      <body className="font-sans">
        <NextAuthSessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
          </ThemeProvider>
        </NextAuthSessionProvider>

        <Toaster />
      </body>
    </html>
  );
}
