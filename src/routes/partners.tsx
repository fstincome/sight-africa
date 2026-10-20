import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";
import { useLang } from "@/lib/i18n";
import { PARTNERS } from "@/lib/partners-data";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partenaires potentiels — SIGHT AFRICA" },
      { name: "description", content: "Partenaires identifiés pour chaque projet SIGHT AFRICA, avec leurs coordonnées publiques." },
      { property: "og:title", content: "Partenaires potentiels — SIGHT AFRICA" },
      { property: "og:description", content: "Partenaires identifiés par projet, avec coordonnées." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  const { lang } = useLang();
  const l = (x: { fr: string; en: string }) => (lang === "fr" ? x.fr : x.en);
  const fr = lang === "fr";
  return (
    <SiteShell>
      <PageHeader
        eyebrow={fr ? "Annexe · Partenaires" : "Annex · Partners"}
        title={fr ? "Partenaires potentiels, projet par projet." : "Potential partners, project by project."}
        lead={fr
          ? "Pistes de collaboration par projet, avec sources et contacts publics. Aucune relation n'est confirmée ; l'éligibilité aux programmes et les autorisations restent à vérifier."
          : "Collaboration candidates by project, with public sources and contacts. No partnership is confirmed; programme eligibility and approvals still require verification."}
      />
      {PARTNERS.map((g) => (
        <Section key={g.project} className="rule-line">
          <div className="mb-6">
            <h2 className="font-display text-3xl">{g.project}</h2>
            <p className="text-muted-foreground mt-1">{l(g.note)}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {g.partners.map((p) => (
              <div key={p.name} className="border border-border p-5 flex flex-col gap-2">
                <div className="eyebrow">{l(p.type)}</div>
                <div className="font-display text-xl">{p.name}</div>
                <p className="text-sm text-foreground/80">{l(p.role)}</p>
                <div className="mt-auto pt-3 text-xs font-mono space-y-1 break-all">
                  <a href={p.site} target="_blank" rel="noreferrer" className="underline block">{p.site.replace(/^https?:\/\//, "")}</a>
                  <div className="text-muted-foreground">
                    {fr ? "Contact : " : "Contact: "}
                    {/^(https?:\/\/|[^\s]+@[^\s]+\.[^\s]+$)/.test(p.contact) ? (
                      <a href={p.contact.includes("@") && !p.contact.startsWith("http") ? `mailto:${p.contact}` : p.contact} target="_blank" rel="noreferrer" className="underline">{p.contact}</a>
                    ) : p.contact}
                  </div>
                  {p.source && <a href={p.source} target="_blank" rel="noreferrer" className="underline text-primary">{fr ? "Source publique" : "Public source"} ↗</a>}
                  {p.checkedAt && <div className="text-muted-foreground">{fr ? "Consulté le " : "Checked "}{p.checkedAt}</div>}
                  {p.status && <p className="font-sans text-xs leading-relaxed text-muted-foreground">{l(p.status)}</p>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </SiteShell>
  );
}
