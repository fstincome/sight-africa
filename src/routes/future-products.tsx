import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";
import { DossierButtons } from "@/components/dossier-buttons";
import { useLocalizedData, useT } from "@/lib/i18n";

export const Route = createFileRoute("/future-products")({
  head: () => ({ meta: [
  {
    "title": "Construction future — SIGHT AFRICA"
  },
  {
    "name": "description",
    "content": "Les 15 filiales SIGHT AFRICA, leurs priorités et leur calendrier de lancement de 2027 à 2032."
  },
  {
    "property": "og:title",
    "content": "Construction future — SIGHT AFRICA"
  },
  {
    "property": "og:description",
    "content": "Les 15 filiales SIGHT AFRICA, leurs priorités et leur calendrier de lancement de 2027 à 2032."
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

const slug = (code: string) => code.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function Page() {
  const t = useT();
  const { FUTURE_PRODUCTS } = useLocalizedData();
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Part 04 · Future products"
        title="Fifteen entities the decade will demand."
        lead="None of these are speculative. Each emerges from the logic of the ecosystem — once you own payments you need identity; once you own identity you need a cloud; once you own a cloud you need security; and once you own all of that, you need compute. Each entity has its own PDF dossier."
      />
      <Section className="rule-line">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {FUTURE_PRODUCTS.map((f, i) => (
            <div key={f.code} className="bg-background p-7 flex flex-col">
              <div className="flex items-baseline justify-between">
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  /{String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-mono text-[10px] text-primary">{t("BORN")} · {f.born}</div>
              </div>
              <div className="font-display text-3xl mt-4">{f.code}</div>
              <div className="text-sm text-primary mt-1">{f.role}</div>
              <p className="mt-4 text-sm text-foreground/80 leading-relaxed">{f.why}</p>
              <div className="mt-6 pt-4 border-t border-border">
                <DossierButtons id={slug(f.code)} name={f.code} />
              </div>
            </div>
          ))}
        </div>

      </Section>
    </SiteShell>
  );
}
