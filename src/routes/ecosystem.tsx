import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";
import { useLocalizedData, useT } from "@/lib/i18n";
import { formatFBU } from "@/lib/money";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({ meta: [{ title: "Écosystème — SIGHT AFRICA" }] }),
  component: Page,
});

function Page() {
  const t = useT();
  const { ECOSYSTEM, ROADMAP } = useLocalizedData();
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Part 09 · Visualization"
        title="The ecosystem at a glance."
        lead="Four layers: a holding group, infrastructure rails, consumer and business platforms, and the talent + voice institutions that protect the long term."
      />

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
