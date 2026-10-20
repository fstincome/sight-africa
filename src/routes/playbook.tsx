import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";
import { useLocalizedData, useT } from "@/lib/i18n";

export const Route = createFileRoute("/playbook")({
  head: () => ({ meta: [
  {
    "title": "Plan d’exécution — SIGHT AFRICA"
  },
  {
    "name": "description",
    "content": "Décisions de réalisation, externalisation et automatisation par produit SIGHT AFRICA."
  },
  {
    "property": "og:title",
    "content": "Plan d’exécution — SIGHT AFRICA"
  },
  {
    "property": "og:description",
    "content": "Décisions de réalisation, externalisation et automatisation par produit SIGHT AFRICA."
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
  const { PLAYBOOK } = useLocalizedData();
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Part 08 · Execution playbook"
        title="Build, wait, outsource, automate."
        lead="Every product needs the same six decisions. Getting them wrong wastes years; getting them right compounds."
      />
      <Section className="rule-line">
        <div className="space-y-px bg-border">
          {PLAYBOOK.map((p) => (
            <div key={p.product} className="bg-background p-8">
              <div className="grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-3">
                  <div className="eyebrow">{t("Product")}</div>
                  <h3 className="font-display text-3xl mt-2">{p.product}</h3>
                </div>
                <div className="lg:col-span-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <Cell k={t("Now")} v={p.now} accent />
                  <Cell k={t("Later")} v={p.later} />
                  <Cell k={t("Outsource")} v={p.outsource} />
                  <Cell k={t("Internal")} v={p.internal} />
                  <Cell k={t("Automate")} v={p.automate} />
                  <Cell k={t("Manual control")} v={p.manual} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
function Cell({ k, v, accent = false }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className={`border-t pt-3 ${accent ? "border-primary" : "border-border"}`}>
      <div className={`eyebrow ${accent ? "text-primary" : ""}`}>{k}</div>
      <div className="text-sm mt-2 leading-relaxed">{v}</div>
    </div>
  );
}
