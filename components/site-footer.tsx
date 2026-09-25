import Link from "next/link";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import GmailIcon from "@/components/gmail-icon";

const socials: { label: string; href: string; icon: IconType; brand: string }[] = [
  { label: "Twitter", href: "https://x.com/payasvaishnav", icon: FaXTwitter, brand: "x" },
  { label: "LinkedIn", href: "https://linkedin.com/in/payasv", icon: FaLinkedin, brand: "linkedin" },
  { label: "GitHub", href: "https://github.com/payasvaishnav", icon: FaGithub, brand: "github" },
  { label: "Email", href: "mailto:replypkv@gmail.com", icon: GmailIcon, brand: "gmail" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="site-footer-copy">
          &copy; 2026 <Link href="/">Payas Vaishnav</Link>{" "}
          <span aria-hidden="true">·</span>{" "}
          <Link href="/policies">Policies &amp; Privacy</Link>
        </p>

        <ul className="site-footer-socials">
          {socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noopener noreferrer">
                <social.icon className={`brand-icon brand-icon-${social.brand}`} size={16} aria-hidden="true" />
                <span>{social.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
