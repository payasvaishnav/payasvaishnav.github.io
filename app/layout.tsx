import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ContactTicker from "@/components/contact-ticker";
import SiteFooter from "@/components/site-footer";
import Analytics from "@/components/analytics";

export const metadata: Metadata = {
  title: {
    default: "Payas Vaishnav",
    template: "%s | Payas Vaishnav",
  },
  description: "A personal space for systems, projects, and ideas..",
  verification: {
    google: "LOxBeV3HrCctugpOGifIpfOTWQHUJf5GF7nxBS45IwA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t;}else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.dataset.theme='dark';}}catch(e){}})();`}
        </Script>
      </head>
      <body>
        {children}
        <ContactTicker />
        <SiteFooter />
        <Analytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
