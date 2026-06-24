import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";
import { useLocalizedData, useT } from "@/lib/i18n";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/roadmap")({
  head: () => ({ meta: [{ title: "Feuille de route — SIGHT AFRICA" }] }),
  component: Page,
});

function Page() {
  const t = useT();
  const { ROADMAP, ROADMAP_20Y } = useLocalizedData();
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Part 02 · Reverse-engineered roadmap"
        title="Ten years, working backwards from 2035."
        lead="Each year carries one theme, a short list of priorities, named product releases, a revenue target, hiring plan, infrastructure investment and the partnerships that unlock the next year."
      />

      <Section className="rule-line">
        <Tabs defaultValue="10y" className="w-full">
          <TabsList>
            <TabsTrigger value="10y">{t("10 years")} · 2026–2035</TabsTrigger>
            <TabsTrigger value="20y">{t("20 years")} · 2026–2045</TabsTrigger>
          </TabsList>
          <TabsContent value="10y">
            <Timeline rows={ROADMAP} t={t} />
          </TabsContent>
          <TabsContent value="20y">
            <Timeline rows={ROADMAP_20Y} t={t} />
          </TabsContent>
        </Tabs>
      </Section>
    </SiteShell>
  );
}

function Timeline({
  rows,
  t,
}: {
  rows: ReturnType<typeof useLocalizedData>["ROADMAP"];
  t: (s: string) => string;
}) {
  return (
    <div className="space-y-px bg-border mt-6">
      {rows.map((y, i) => (
        <div key={y.year} className="bg-background">
          <div className="container-x !px-0 grid lg:grid-cols-12 gap-8 py-12">
            <div className="lg:col-span-3">
              <div className="font-display text-7xl leading-none">{y.year}</div>
              <div className="mt-3 font-mono text-xs tracking-widest text-primary">
                {t("PHASE")} · {y.theme.toUpperCase()}
              </div>
              <div className="mt-6 space-y-2 text-sm">
                <div><span className="text-muted-foreground">{t("Revenue")}</span> · <span className="font-mono">{y.revenue}</span></div>
                <div><span className="text-muted-foreground">{t("Team")}</span> · <span className="font-mono">{y.team}</span></div>
              </div>
            </div>
            <div className="lg:col-span-9 grid md:grid-cols-2 gap-8">
              <Block title={t("Strategic priorities")} items={y.priorities} />
              <Block title={t("Releases")} items={y.releases} />
              <Block title={t("Infrastructure")} items={y.infra} />
              <Block title={t("Partnerships")} items={y.partners} />
            </div>
          </div>
          {i < rows.length - 1 && <div className="rule-line" />}
        </div>
      ))}
    </div>
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
