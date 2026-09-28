import type { Metadata } from "next";
import { Header, Footer } from "@/components/shell";
import "./globals.css";
import { siteOrigin, siteDescription } from "@/lib/site";
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin || "http://localhost:3000"),
  title: { default: "Roman Quintero — Software Engineer", template: "%s / Roman Quintero" },
  description: siteDescription,
  icons: { icon: "/favicon.svg" },
  robots: { index: Boolean(siteOrigin), follow: Boolean(siteOrigin) },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
