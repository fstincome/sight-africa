import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";
import { useLang, useLocalizedData, useT } from "@/lib/i18n";
import { formatFBU } from "@/lib/money";
import { ECOSYSTEM_SITES } from "@/lib/ecosystem-sites";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({ meta: [
  {
    "title": "Écosystème — SIGHT AFRICA"
  },
  {
    "name": "description",
    "content": "Relations entre les infrastructures, plateformes et institutions de talents de SIGHT AFRICA."
  },
  {
    "property": "og:title",
    "content": "Écosystème — SIGHT AFRICA"
  },
  {
    "property": "og:description",
    "content": "Relations entre les infrastructures, plateformes et institutions de talents de SIGHT AFRICA."
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
  const { lang } = useLang();
  const fr = lang === "fr";
  const { ECOSYSTEM, ROADMAP } = useLocalizedData();
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Part 09 · Visualization"
        title="The ecosystem at a glance."
        lead="Four layers: a holding group, infrastructure rails, consumer and business platforms, and the talent + voice institutions that protect the long term."
      />

      <Section className="rule-line">
        <div className="eyebrow">{fr ? "Sites disponibles" : "Available sites"}</div>
        <h2 className="font-display text-4xl mt-3">{fr ? "Déjà en ligne. Commercialisation en janvier 2027." : "Already online. Commercialization in January 2027."}</h2>
        <p className="text-muted-foreground mt-4 max-w-3xl leading-relaxed">
          {fr ? "Ces sites sont déjà disponibles. Leur commercialisation commence le 1er janvier 2027 ; 2026 reste une année de préparation, hors agenda d’exécution." : "These sites are already available. Commercialization starts on January 1, 2027; 2026 remains a preparation year, outside the execution agenda."}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {ECOSYSTEM_SITES.map((site) => (
            <article key={site.url} className="border border-border p-5 rounded-md flex flex-col gap-4 min-w-0">
              <div className="flex items-center gap-2 text-primary text-sm"><CheckCircle2 className="size-4 shrink-0" />{fr ? "Disponible" : "Available"}</div>
              <div>
                <h3 className="font-display text-2xl">{site.name}</h3>
                {site.kind && <p className="text-sm text-muted-foreground mt-1">{site.kind === "application" ? (fr ? "Application" : "Application") : (fr ? "Site web" : "Website")}</p>}
                <p className="text-xs font-mono text-muted-foreground mt-3 break-all">{new URL(site.url).hostname}</p>
              </div>
              <p className="text-sm border-t border-border pt-4">{fr ? "Commercialisation : janvier 2027" : "Commercialization: January 2027"}</p>
              <Button asChild variant="outline" className="mt-auto self-start">
                <a href={site.url} target="_blank" rel="noopener noreferrer" aria-label={`${fr ? "Ouvrir" : "Open"} ${site.name} — ${new URL(site.url).hostname}`}>
                  {fr ? "Ouvrir" : "Open"}<ArrowUpRight />
                </a>
              </Button>
            </article>
          ))}
        </div>
      </Section>

      <Section className="rule-line">
        <div className="space-y-px bg-border">
          {ECOSYSTEM.layers.map((layer) => (
            <div key={layer.name} className="bg-background p-8">
              <div className="grid lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-3">
                  <div className="eyebrow">{t("Layer")}</div>
                  <h3 className="font-display text-3xl mt-2">{t(layer.name)}</h3>
                </div>
                <div className="lg:col-span-9 flex flex-wrap gap-3">
                  {layer.items.map((item) => (
                    <div key={item} className="border border-border px-4 py-3 font-mono text-xs tracking-wide hover:border-foreground hover:bg-secondary transition-colors">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="rule-line">
        <div className="eyebrow">{t("Revenue trajectory")}</div>
        <h2 className="font-display text-4xl mt-3">{t("From $0.6M to $640M — a 1,000× decade.")}</h2>
        <RevenueChart roadmap={ROADMAP} />
      </Section>

      <Section className="rule-line">
        <div className="eyebrow">{t("Headcount growth")}</div>
        <h2 className="font-display text-4xl mt-3">{t("From 18 people to 4,800 across 9 countries.")}</h2>
        <HeadcountChart roadmap={ROADMAP} />
      </Section>
    </SiteShell>
  );
}

function parseRevenueUSD(s: string): number {
  // After localization, revenue is already in FBU format. We re-parse from original via fallback heuristic:
  // try matching a "(\d+(.\d+)?) M FBU" / "Md FBU" / "Bn FBU" form.
  const mM = s.match(/([\d.,]+)\s*M\s*FBU/);
  if (mM) return parseFloat(mM[1].replace(/\s/g, "").replace(",", ".")) / 2950; // back to USD M for relative scale only
  const mMd = s.match(/([\d.,]+)\s*Md\s*FBU/);
  if (mMd) return (parseFloat(mMd[1].replace(/\s/g, "").replace(",", ".")) * 1000) / 2950;
  const mBn = s.match(/([\d.,]+)\s*Bn\s*FBU/);
  if (mBn) return (parseFloat(mBn[1].replace(/\s/g, "").replace(",", ".")) * 1_000_000) / 2950;
  const usd = s.match(/\$([\d.]+)\s*M/);
  return usd ? parseFloat(usd[1]) : 0;
}
function parseTeam(s: string): number {
  const m = s.match(/([\d,]+)\s*$/);
  return m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
}

function RevenueChart({ roadmap }: { roadmap: ReturnType<typeof useLocalizedData>["ROADMAP"] }) {
  const data = roadmap.map((y) => ({ year: y.year, value: parseRevenueUSD(y.revenue) }));
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="mt-10 grid grid-cols-10 gap-2 items-end h-72 border-b border-foreground">
      {data.map((d) => {
        const h = Math.max(2, (d.value / max) * 100);
        return (
          <div key={d.year} className="flex flex-col items-center justify-end h-full group">
            <div className="text-[9px] font-mono mb-2 opacity-70 group-hover:opacity-100 text-center leading-tight">
              {formatFBU(d.value * 1_000_000)}
            </div>
            <div className="w-full bg-primary/80 group-hover:bg-primary transition-colors" style={{ height: `${h}%` }} />
            <div className="text-[10px] font-mono mt-2 text-muted-foreground">{d.year}</div>
          </div>
        );
      })}
    </div>
  );
}

function HeadcountChart({ roadmap }: { roadmap: ReturnType<typeof useLocalizedData>["ROADMAP"] }) {
  const data = roadmap.map((y) => ({ year: y.year, value: parseTeam(y.team) }));
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="mt-10 grid grid-cols-10 gap-2 items-end h-64 border-b border-foreground">
      {data.map((d) => {
        const h = Math.max(2, (d.value / max) * 100);
        return (
          <div key={d.year} className="flex flex-col items-center justify-end h-full group">
            <div className="text-[10px] font-mono mb-2 opacity-70 group-hover:opacity-100">
              {d.value.toLocaleString("fr-FR")}
            </div>
            <div className="w-full border border-foreground bg-background" style={{ height: `${h}%` }} />
            <div className="text-[10px] font-mono mt-2 text-muted-foreground">{d.year}</div>
          </div>
        );
      })}
    </div>
  );
}
