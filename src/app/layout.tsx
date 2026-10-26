import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F4EE" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0d0c" },
  ],
};

export const metadata: Metadata = {
  title: "AVODAH & KHEN LLP — Luxury Real Estate & Architectural Advisory",
  description:
    "AVODAH & KHEN LLP provides technology-driven real estate solutions, structured sole selling mandates, leasing & investment advisory, and property intelligence across Mumbai.",
  keywords: [
    "Avodah & Khen",
    "Mumbai Real Estate Mandates",
    "Sole Selling Partner",
    "Commercial Leasing Advisory",
    "Real Estate Investment Mumbai",
    "PropTech Ecosystem",
    "Architectural Real Estate",
  ],
  openGraph: {
    title: "AVODAH & KHEN LLP — Architectural Real Estate & Advisory",
    description:
      "Where Vision Becomes Reality. Discover a considered approach to real estate, design, and connected property ecosystems.",
    type: "website",
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
      className={`${cormorant.variable} ${plusJakarta.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var now = new Date();
                var hour = now.getHours();
                var theme = (hour >= 19 || hour < 7) ? 'dark' : 'light';
                var raw = localStorage.getItem('ak_theme_override');
                if (raw) {
                  var parsed = JSON.parse(raw);
                  if (parsed && typeof parsed.expiresAt === 'number' && now.getTime() < parsed.expiresAt) {
                    if (parsed.theme === 'dark' || parsed.theme === 'light') {
                      theme = parsed.theme;
                    }
                  } else {
                    localStorage.removeItem('ak_theme_override');
                  }
                }
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(theme);
                document.documentElement.setAttribute('data-theme', theme);
              } catch(e) {}
            })();`,
          }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-[#A8875B] selection:text-white overflow-x-hidden min-h-screen">
        <ThemeProvider>
          <Suspense fallback={null}>
            <ScrollToTop />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
