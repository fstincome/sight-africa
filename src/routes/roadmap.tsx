import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";
import { ROADMAP } from "@/lib/sight-data";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "10-Year Roadmap — SIGHT AFRICA" },
      { name: "description", content: "Year-by-year strategic priorities, releases, revenue targets, team growth, infrastructure and partnerships from 2026 to 2035." },
      { property: "og:title", content: "10-Year Roadmap — SIGHT AFRICA" },
      { property: "og:description", content: "Working backwards from 2035 to today." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Part 02 · Reverse-engineered roadmap"
        title="Ten years, working backwards from 2035."
        lead="Each year carries one theme, a short list of priorities, named product releases, a revenue target, hiring plan, infrastructure investment and the partnerships that unlock the next year."
      />

      <Section className="rule-line">
        <div className="space-y-px bg-border">
          {ROADMAP.map((y, i) => (
            <div key={y.year} className="bg-background">
              <div className="container-x !px-0 grid lg:grid-cols-12 gap-8 py-12">
                <div className="lg:col-span-3">
                  <div className="font-display text-7xl leading-none">{y.year}</div>
                  <div className="mt-3 font-mono text-xs tracking-widest text-primary">
                    PHASE · {y.theme.toUpperCase()}
                  </div>
                  <div className="mt-6 space-y-2 text-sm">
                    <div><span className="text-muted-foreground">Revenue</span> · <span className="font-mono">{y.revenue}</span></div>
                    <div><span className="text-muted-foreground">Team</span> · <span className="font-mono">{y.team}</span></div>
                  </div>
                </div>
                <div className="lg:col-span-9 grid md:grid-cols-2 gap-8">
                  <Block title="Strategic priorities" items={y.priorities} />
                  <Block title="Releases" items={y.releases} />
                  <Block title="Infrastructure" items={y.infra} />
                  <Block title="Partnerships" items={y.partners} />
                </div>
              </div>
              {i < ROADMAP.length - 1 && <div className="rule-line" />}
            </div>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="eyebrow">{title}</div>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i} className="text-sm leading-relaxed flex gap-3">
            <span className="text-primary mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
