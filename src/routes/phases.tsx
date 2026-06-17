import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";
import { useLocalizedData, useT } from "@/lib/i18n";

export const Route = createFileRoute("/phases")({
  head: () => ({ meta: [{ title: "Phases stratégiques — SIGHT AFRICA" }] }),
  component: Page,
});

function Page() {
  const t = useT();
  const { PHASES } = useLocalizedData();
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Part 06 · Strategic phases"
        title="Five phases. One trajectory."
        lead="Each phase has a different center of gravity — cashflow first, then validation, then platform, then geography, then institutional scale."
      />
      <Section className="rule-line">
        <div className="space-y-px bg-border">
          {PHASES.map((p, i) => (
            <div key={p.name} className="bg-background p-8">
              <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3">
                  <div className="font-mono text-xs text-primary tracking-widest">{t("PHASE")} 0{i + 1}</div>
                  <div className="font-display text-4xl mt-2">{p.name}</div>
                  <div className="mt-2 font-mono text-sm text-muted-foreground">{p.years}</div>
                  <div className="mt-6 text-sm space-y-1">
                    <Stat k={t("Revenue")} v={p.revenue} />
                    <Stat k={t("Hiring")} v={p.hiring} />
                    <Stat k={t("Funding")} v={p.funding} />
                  </div>
                </div>
                <div className="lg:col-span-9 grid md:grid-cols-2 gap-6">
                  <List title={t("Goals")} items={p.goals} />
                  <List title={t("KPIs")} items={p.kpis} />
                  <List title={t("Products")} items={p.products} />
                  <List title={t("Risks")} items={p.risks} />
                  <div className="md:col-span-2 border-t border-border pt-4">
                    <div className="eyebrow">{t("Execution strategy")}</div>
                    <p className="mt-2 text-base leading-relaxed">{p.execution}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-t border-border pt-2 text-sm gap-3">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-mono text-right max-w-[60%] break-words">{v}</span>
    </div>
  );
}
function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="eyebrow">{title}</div>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i} className="text-sm flex gap-3 leading-relaxed">
            <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
