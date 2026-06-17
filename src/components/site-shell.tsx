import { Link, Outlet } from "@tanstack/react-router";
import { NAV, SIGHT } from "@/lib/sight-data";
import type { ReactNode } from "react";

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
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container-x flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3 group">
          <Mark />
          <div className="leading-none">
            <div className="text-[15px] tracking-tight font-medium">SIGHT AFRICA</div>
            <div className="eyebrow text-[10px] mt-1">Strategic Operating System</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "px-3 py-2 text-sm text-foreground font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/vision-2035"
          className="hidden md:inline-flex items-center gap-2 text-sm text-primary hover:underline underline-offset-4"
        >
          2035 →
        </Link>
      </div>
      <MobileNav />
    </header>
  );
}

function MobileNav() {
  return (
    <div className="lg:hidden border-t border-border overflow-x-auto">
      <div className="container-x flex gap-1 py-2 whitespace-nowrap">
        {NAV.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
            activeProps={{ className: "px-3 py-1.5 text-xs text-foreground font-medium" }}
            activeOptions={{ exact: n.to === "/" }}
          >
            {n.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="rule-line mt-24">
      <div className="container-x py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Mark />
            <div className="font-display text-2xl">{SIGHT.name}</div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
            {SIGHT.tagline} A strategic operating system for the decade ahead — built for founders, operators, partners and investors.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-3">Group</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/vision-2035" className="hover:text-primary">Vision 2035</Link></li>
            <li><Link to="/roadmap" className="hover:text-primary">10-year roadmap</Link></li>
            <li><Link to="/ecosystem" className="hover:text-primary">Ecosystem map</Link></li>
            <li><Link to="/organization" className="hover:text-primary">Organization</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-3">Stack</div>
          <ul className="space-y-2 text-sm">
            <li><a href="https://www.mysatoshis.bi" className="hover:text-primary" target="_blank" rel="noreferrer">My Satoshis →</a></li>
            <li><a href="https://www.exchanger.mysatoshis.bi" className="hover:text-primary" target="_blank" rel="noreferrer">MS Exchanger →</a></li>
            <li><Link to="/products" className="hover:text-primary">LEARN BTC</Link></li>
            <li><Link to="/products" className="hover:text-primary">Africa Fintech Journal</Link></li>
            <li><Link to="/products" className="hover:text-primary">Yepo</Link></li>
          </ul>
        </div>
      </div>
      <div className="rule-line">
        <div className="container-x py-6 flex flex-wrap justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} SIGHT AFRICA · Bujumbura · East Africa</div>
          <div className="font-mono">v.2035 / blueprint.01</div>
        </div>
      </div>
    </footer>
  );
}

export function Mark() {
  return (
    <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-sm border border-foreground/80">
      <span className="absolute inset-1 border border-primary/60" />
      <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
    </span>
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
  return (
    <section className="container-x pt-20 pb-12">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight mt-4 max-w-4xl">
        {title}
      </h1>
      {lead && (
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">{lead}</p>
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
