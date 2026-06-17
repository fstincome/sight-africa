import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";
import { ORG } from "@/lib/sight-data";

export const Route = createFileRoute("/organization")({
  head: () => ({
    meta: [
      { title: "Organizational Design — SIGHT AFRICA" },
      { name: "description", content: "From 15 people today to a 4,800-person, 9-country technology group with independent subsidiaries, an investment arm and a public-interest foundation." },
      { property: "og:title", content: "Organizational Design — SIGHT AFRICA" },
      { property: "og:description", content: "How the org evolves: today, 1y, 5y, 10y." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Part 05 · Organizational design"
        title="From a 15-person team to a continental technology group."
        lead="The shape of the company changes deliberately at each stage. Centralized today for speed; subsidiary-based tomorrow for accountability; holding structure long-term for governance and capital."
      />
      <Section className="rule-line">
        <div className="grid md:grid-cols-4 gap-px bg-border">
          {ORG.map((o) => (
            <div key={o.label} className="bg-background p-6">
              <div className="font-mono text-xs tracking-widest text-primary">{o.label.toUpperCase()}</div>
              <div className="font-display text-4xl mt-3">{o.headcount}</div>
              <ul className="mt-5 space-y-2">
                {o.teams.map((t) => (
                  <li key={t} className="text-sm text-foreground/80 border-t border-border pt-2 leading-snug">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section className="rule-line">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="eyebrow">Governance principles</div>
            <h2 className="font-display text-4xl mt-3">Designed to outlive its founders.</h2>
          </div>
          <div className="space-y-6 text-foreground/80">
            <P n="01" t="Subsidiary accountability">Each subsidiary has its own MD, P&L, board and roadmap. The holding allocates capital and protects the brand.</P>
            <P n="02" t="Shared infrastructure">PAY, ID, CLOUD, DATA, SECURITY are common rails — not duplicated per product.</P>
            <P n="03" t="Independent board">Recruited progressively from finance, telecom, government, civil society and global tech.</P>
            <P n="04" t="Talent pipeline owned">SIGHT ACADEMY is the long-term talent supply chain. Hiring is not left to the market.</P>
            <P n="05" t="Public-interest commitment">SIGHT FOUNDATION isolates the group's social mission from quarterly pressure.</P>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

function P({ n, t, children }: { n: string; t: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-4 flex gap-5">
      <span className="font-mono text-xs text-primary">{n}</span>
      <div>
        <div className="font-display text-xl">{t}</div>
        <p className="mt-1 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
