import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";
import { ECOSYSTEM, ROADMAP } from "@/lib/sight-data";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({
    meta: [
      { title: "Ecosystem Map — SIGHT AFRICA" },
      { name: "description", content: "The SIGHT AFRICA group at a glance: holding entities, infrastructure rails, platforms, talent and media — and the timeline of how revenue and headcount compound." },
      { property: "og:title", content: "Ecosystem Map — SIGHT AFRICA" },
      { property: "og:description", content: "Group · Infrastructure · Platforms · Voice." },
    ],
  }),
  component: Page,
});

function Page() {
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
                  <div className="eyebrow">Layer</div>
                  <h3 className="font-display text-3xl mt-2">{layer.name}</h3>
                </div>
                <div className="lg:col-span-9 flex flex-wrap gap-3">
                  {layer.items.map((item) => (
                    <div
                      key={item}
                      className="border border-border px-4 py-3 font-mono text-xs tracking-wide hover:border-foreground hover:bg-secondary transition-colors"
                    >
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
        <div className="eyebrow">Revenue trajectory</div>
        <h2 className="font-display text-4xl mt-3">From $0.6M to $640M — a 1,000× decade.</h2>
        <RevenueChart />
      </Section>

      <Section className="rule-line">
        <div className="eyebrow">Headcount growth</div>
        <h2 className="font-display text-4xl mt-3">From 18 people to 4,800 across 9 countries.</h2>
        <HeadcountChart />
      </Section>
    </SiteShell>
  );
}

function parseRevenue(s: string): number {
  // strings like "$640M ARR" or "$0.6M ARR"
  const m = s.match(/\$([\d.]+)\s*M/);
  return m ? parseFloat(m[1]) : 0;
}
function parseTeam(s: string): number {
  // strings like "4,200 → 4,800"
  const m = s.match(/([\d,]+)\s*$/);
  return m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
}

function RevenueChart() {
  const data = ROADMAP.map((y) => ({ year: y.year, value: parseRevenue(y.revenue) }));
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="mt-10 grid grid-cols-10 gap-2 items-end h-72 border-b border-foreground">
      {data.map((d) => {
        const h = Math.max(2, (d.value / max) * 100);
        return (
          <div key={d.year} className="flex flex-col items-center justify-end h-full group">
            <div className="text-[10px] font-mono mb-2 opacity-70 group-hover:opacity-100">
              ${d.value}M
            </div>
            <div
              className="w-full bg-primary/80 group-hover:bg-primary transition-colors"
              style={{ height: `${h}%` }}
            />
            <div className="text-[10px] font-mono mt-2 text-muted-foreground">{d.year}</div>
          </div>
        );
      })}
    </div>
  );
}

function HeadcountChart() {
  const data = ROADMAP.map((y) => ({ year: y.year, value: parseTeam(y.team) }));
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="mt-10 grid grid-cols-10 gap-2 items-end h-64 border-b border-foreground">
      {data.map((d) => {
        const h = Math.max(2, (d.value / max) * 100);
        return (
          <div key={d.year} className="flex flex-col items-center justify-end h-full group">
            <div className="text-[10px] font-mono mb-2 opacity-70 group-hover:opacity-100">
              {d.value.toLocaleString()}
            </div>
            <div
              className="w-full border border-foreground bg-background"
              style={{ height: `${h}%` }}
            />
            <div className="text-[10px] font-mono mt-2 text-muted-foreground">{d.year}</div>
          </div>
        );
      })}
    </div>
  );
}
