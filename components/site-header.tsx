import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";

export default function SiteHeader() {
  return (
    <header className="topbar">
      <h1>
        <Link href="/" className="site-name">
          Payas Vaishnav
        </Link>
      </h1>
      <div className="topbar-right">
        <nav>
          <Link href="/library" className="top-link">
            Library
          </Link>
          <Link href="/collection" className="top-link">
            Collection
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
