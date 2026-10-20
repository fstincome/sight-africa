import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";
import { useLocalizedData, useT } from "@/lib/i18n";

export const Route = createFileRoute("/organization")({
  head: () => ({ meta: [
  {
    "title": "Organisation — SIGHT AFRICA"
  },
  {
    "name": "description",
    "content": "Équipes, responsabilités et gouvernance du groupe technologique SIGHT AFRICA."
  },
  {
    "property": "og:title",
    "content": "Organisation — SIGHT AFRICA"
  },
  {
    "property": "og:description",
    "content": "Équipes, responsabilités et gouvernance du groupe technologique SIGHT AFRICA."
  },
  {
    "property": "og:type",
    "content": "website"
  },
  {
    "name": "twitter:card",
    "content": "summary"
  }
] }),
  component: Page,
});

function Page() {
  const t = useT();
  const { ORG } = useLocalizedData();
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
                {o.teams.map((tm) => (
                  <li key={tm} className="text-sm text-foreground/80 border-t border-border pt-2 leading-snug">
                    {tm}
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
            <div className="eyebrow">{t("Governance principles")}</div>
            <h2 className="font-display text-4xl mt-3">{t("Designed to outlive its founders.")}</h2>
          </div>
          <div className="space-y-6 text-foreground/80">
            <P n="01" title={t("Subsidiary accountability")}>{t("Each subsidiary has its own MD, P&L, board and roadmap. The holding allocates capital and protects the brand.")}</P>
            <P n="02" title={t("Shared infrastructure")}>{t("PAY, ID, CLOUD, DATA, SECURITY are common rails — not duplicated per product.")}</P>
            <P n="03" title={t("Independent board")}>{t("Recruited progressively from finance, telecom, government, civil society and global tech.")}</P>
            <P n="04" title={t("Talent pipeline owned")}>{t("SIGHT ACADEMY is the long-term talent supply chain. Hiring is not left to the market.")}</P>
            <P n="05" title={t("Public-interest commitment")}>{t("SIGHT FOUNDATION isolates the group's social mission from quarterly pressure.")}</P>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

function P({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-4 flex gap-5">
      <span className="font-mono text-xs text-primary">{n}</span>
      <div>
        <div className="font-display text-xl">{title}</div>
        <p className="mt-1 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
