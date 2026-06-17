import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";
import { useLocalizedData, useT } from "@/lib/i18n";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Évolution des produits — SIGHT AFRICA" }] }),
  component: Page,
});

function Page() {
  const t = useT();
  const { PRODUCTS } = useLocalizedData();
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Part 03 · Product evolution"
        title="Four products today. Foundational infrastructure tomorrow."
        lead="Each existing product carries a 10-year arc: users, revenue, features, market position, risks, competitive advantage, technology stack and team requirements at every stage."
      />

      {PRODUCTS.map((p) => (
        <Section key={p.id} className="rule-line">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="eyebrow">{t("Product")}</div>
              <h2 className="font-display text-5xl mt-2">{p.name}</h2>
            </div>
            <p className="max-w-md text-muted-foreground">{p.summary}</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-px bg-border">
            {p.stages.map((s) => (
              <div key={s.label} className="bg-background p-5">
                <div className="font-mono text-xs tracking-widest text-primary">{s.label.toUpperCase()}</div>
                <Row k={t("Users")} v={s.users} />
                <Row k={t("Revenue")} v={s.revenue} />
                <Row k={t("Features")} v={s.features.join(" · ")} />
                <Row k={t("Market")} v={s.market} />
                <Row k={t("Risks")} v={s.risks.join(" · ")} />
                <Row k={t("Advantage")} v={s.advantage} />
                <Row k={t("Stack")} v={s.stack.join(" · ")} />
                <Row k={t("Team")} v={s.team} />
              </div>
            ))}
          </div>
        </Section>
      ))}
    </SiteShell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="mt-4 border-t border-border pt-3">
      <div className="eyebrow text-[9px]">{k}</div>
      <div className="text-sm mt-1 leading-snug">{v}</div>
    </div>
  );
}
