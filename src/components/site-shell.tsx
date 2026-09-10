import { Link, Outlet } from "@tanstack/react-router";
import sightLogo from "@/assets/sight-logo.png.asset.json";
import type { ReactNode } from "react";
import { useT, useLocalizedData } from "@/lib/i18n";
import { LangToggle } from "@/components/lang-toggle";
import { useAuth } from "@/lib/auth";

export function SiteShell({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
}

function Header() {
  const t = useT();
  const { signOut } = useAuth();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container-x flex items-center justify-between h-16 gap-4">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <Mark className="h-10 w-auto" />
          <span className="hidden sm:block leading-none border-l border-border pl-3">
            <span className="block text-[11px] tracking-[0.18em] uppercase text-muted-foreground font-mono">AFRICA</span>
            <span className="block text-[10px] tracking-[0.16em] uppercase text-primary font-mono mt-1">{t("Strategic OS")}</span>
          </span>
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/blueprint"
            className="hidden md:inline-flex font-mono text-[11px] px-2 py-1 border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            title="Download Word blueprint"
          >
            ↓ .DOCX
          </Link>
          <LangToggle />
          <button
            onClick={signOut}
            className="hidden md:inline-flex font-mono text-[11px] px-2 py-1 border border-border text-muted-foreground hover:text-foreground"
            title="Se déconnecter / Sign out"
          >
            ⎋
          </button>
        </div>
      </div>
      <MobileNav />
    </header>
  );
}

function DesktopNav() {
  const { NAV_GROUPS } = useLocalizedData();
  return (
    <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
      {NAV_GROUPS.map((g) =>
        g.items.length === 0 && g.to ? (
          <Link
            key={g.label}
            to={g.to}
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ className: "px-3 py-2 text-sm text-foreground font-medium" }}
            activeOptions={{ exact: true }}
          >
            {g.label}
          </Link>
        ) : (
          <div key={g.label} className="relative group">
            <button className="px-3 py-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors inline-flex items-center gap-1.5">
              {g.label}
              <span className="text-[9px] opacity-60">▾</span>
            </button>
            <div className="absolute left-0 top-full pt-1 hidden group-hover:block group-focus-within:block">
              <div className="w-72 border border-border bg-background shadow-xl">
                {g.items.map((i) => (
                  <Link
                    key={i.to}
                    to={i.to}
                    className="block px-4 py-3 border-b border-border last:border-b-0 hover:bg-secondary transition-colors"
                    activeProps={{ className: "block px-4 py-3 border-b border-border last:border-b-0 bg-secondary" }}
                  >
                    <div className="text-sm">{i.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{i.note}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ),
      )}
    </nav>
  );
}

function MobileNav() {
  const { NAV_GROUPS } = useLocalizedData();
  return (
    <div className="lg:hidden border-t border-border overflow-x-auto">
      <div className="container-x flex items-stretch gap-4 py-2 whitespace-nowrap">
        {NAV_GROUPS.map((g) => (
          <div key={g.label} className="flex flex-col gap-1">
            {g.items.length === 0 && g.to ? (
              <Link
                to={g.to}
                className="px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                activeProps={{ className: "px-2 py-1.5 text-xs text-foreground font-medium" }}
                activeOptions={{ exact: true }}
              >
                {g.label}
              </Link>
            ) : (
              <>
                <div className="px-2 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">{g.label}</div>
                <div className="flex gap-1">
                  {g.items.map((i) => (
                    <Link
                      key={i.to}
                      to={i.to}
                      className="px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
                      activeProps={{ className: "px-2 py-1 text-xs text-foreground font-medium" }}
                    >
                      {i.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  const t = useT();
  const { SIGHT } = useLocalizedData();
  return (
    <footer className="rule-line mt-24">
      <div className="container-x py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Mark className="h-16 w-auto" />
          <p className="mt-6 text-sm text-muted-foreground max-w-md leading-relaxed">
            {SIGHT.tagline} {t("A strategic operating system for the decade ahead — built for founders, operators, partners and investors.")}
          </p>
          <p className="mt-3 text-xs italic text-muted-foreground/80">{t("Equipping today, inventing tomorrow.")}</p>
          <p className="mt-4 text-[11px] font-mono text-muted-foreground">FBU · 1 USD ≈ 2 950 FBU</p>
        </div>
        <div>
          <div className="eyebrow mb-3">{t("Group")}</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/vision-2036" className="hover:text-primary">{t("Vision 2036")}</Link></li>
            <li><Link to="/roadmap" className="hover:text-primary">{t("10-year roadmap")}</Link></li>
            <li><Link to="/ecosystem" className="hover:text-primary">{t("Ecosystem map")}</Link></li>
            <li><Link to="/organization" className="hover:text-primary">{t("Organization")}</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-3">{t("Stack")}</div>
          <ul className="space-y-2 text-sm">
            <li><a href="https://exchanger.bitlibera.com" className="hover:text-primary" target="_blank" rel="noreferrer">BitLibera Exchanger →</a></li>
            <li><a href="https://exchanger.bitlibera.com/docs" className="hover:text-primary" target="_blank" rel="noreferrer">BitLibera Docs →</a></li>
            <li><Link to="/products" className="hover:text-primary">LEARN BTC</Link></li>
            <li><Link to="/products" className="hover:text-primary">{t("Africa Fintech Journal")}</Link></li>
            <li><Link to="/products" className="hover:text-primary">{t("Yepo")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="rule-line">
        <div className="container-x py-6 flex flex-wrap justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} SIGHT AFRICA · Bujumbura · East Africa</div>
          <div className="font-mono">v.2036 / blueprint.01</div>
        </div>
      </div>
    </footer>
  );
}

export function Mark({ className = "h-9 w-auto" }: { className?: string } = {}) {
  return (
    <img
      src={sightLogo.url}
      alt="SIGHT AFRICA"
      className={`${className} object-contain`}
    />
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  const t = useT();
  return (
    <section className="container-x pt-20 pb-12">
      <Eyebrow>{t(eyebrow)}</Eyebrow>
      <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight mt-4 max-w-4xl">
        {t(title)}
      </h1>
      {lead && (
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">{t(lead)}</p>
      )}
    </section>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`container-x py-16 ${className}`}>{children}</section>;
}
