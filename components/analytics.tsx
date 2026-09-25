"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Consent = "accepted" | "declined" | null;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "analytics-consent";

export default function Analytics({ measurementId }: { measurementId?: string }) {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>(() => {
    if (typeof window === "undefined") return null;
    const savedConsent = window.localStorage.getItem(CONSENT_KEY);
    return savedConsent === "accepted" || savedConsent === "declined"
      ? savedConsent
      : null;
  });
  const hasLoaded = useRef(false);

  const loadAnalytics = useCallback(() => {
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
    if (consent === "accepted") loadAnalytics();
  }, [consent, loadAnalytics]);

  useEffect(() => {
    if (consent === "accepted" && window.gtag) {
      window.gtag("config", measurementId, {
        page_path: pathname,
      });
    }
  }, [consent, measurementId, pathname]);

  if (!measurementId || consent !== null) return null;

  function saveConsent(value: Exclude<Consent, null>) {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
    if (value === "accepted") loadAnalytics();
  }

  return (
    <aside className="analytics-consent" aria-label="Analytics preference">
      <p>
        I&apos;d like to use anonymous traffic analytics to understand what is
        useful. May I enable Google Analytics?
      </p>
      <div className="analytics-consent-actions">
        <button type="button" onClick={() => saveConsent("accepted")}>
          Accept analytics
        </button>
        <button type="button" onClick={() => saveConsent("declined")}>
          Keep disabled
        </button>
      </div>
    </aside>
  );
}
