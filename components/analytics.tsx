"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function Analytics({ measurementId }: { measurementId?: string }) {
  const pathname = usePathname();
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!measurementId || hasLoaded.current) return;

    hasLoaded.current = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { send_page_view: false });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
  }, [measurementId]);

  useEffect(() => {
    if (measurementId && window.gtag) {
      window.gtag("config", measurementId, {
        page_path: pathname,
      });
    }
  }, [measurementId, pathname]);

  return null;
}
