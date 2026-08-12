import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Section, Eyebrow } from "@/components/site-shell";
import { useLang } from "@/lib/i18n";
import {
  IMPL_INTRO,
  STACK_LAYERS,
  STAGE_SPECS,
  RELATIONS,
  IMPL_RULES,
  type L,
} from "@/lib/implementation-data";

export const Route = createFileRoute("/implementation")({
  head: () => ({
    meta: [
      { title: "Mise en place des produits — SIGHT AFRICA" },
      {
        name: "description",
        content:
          "Stacks visés, cahiers des charges par étape de réalisation et relations de dépendance entre les produits du groupe SIGHT AFRICA.",
      },
      { property: "og:title", content: "Mise en place des produits — SIGHT AFRICA" },
      {
        property: "og:description",
        content:
          "Document interne de lecture : stacks, cahiers des charges par étape, dépendances entre filiales.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const { lang } = useLang();
  const s = (v: L) => v[lang];

  return (
    <SiteShell>
      <section className="container-x pt-20 pb-12">
        <Eyebrow>{s(IMPL_INTRO.eyebrow)}</Eyebrow>
        <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight mt-4 max-w-4xl">
          {s(IMPL_INTRO.title)}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          {s(IMPL_INTRO.lead)}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
          <span aria-hidden>●</span>
          {lang === "fr" ? "Lecture sur la plateforme uniquement" : "On-platform reading only"}
        </div>
      </section>

      {/* 1 — Stack */}
      <Section className="rule-line">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-primary">01</span>
          <h2 className="font-display text-3xl md:text-4xl">
            {lang === "fr" ? "Stacks visés" : "Target stacks"}
          </h2>
        </div>
        <div className="mt-10 grid gap-px bg-border md:grid-cols-2">
          {STACK_LAYERS.map((l) => (
            <div key={l.layer.en} className="bg-background p-7">
              <div className="eyebrow">{s(l.layer)}</div>
              <div className="font-display text-2xl mt-2">{s(l.target)}</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s(l.why)}</p>
              <ul className="mt-5 space-y-1.5">
                {l.items.map((it) => (
                  <li key={it} className="font-mono text-[11px] text-foreground/80 flex gap-2">
                    <span className="text-primary" aria-hidden>
                      ›
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* 2 — Stage specs */}
      <Section className="rule-line">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-primary">02</span>
          <h2 className="font-display text-3xl md:text-4xl">
            {lang === "fr"
              ? "Cahiers des charges par étape"
              : "Specifications by build stage"}
          </h2>
        </div>
        <div className="mt-10 space-y-px bg-border">
          {STAGE_SPECS.map((st) => (
            <div key={st.code} className="bg-background p-8 grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-3">
                <div className="font-mono text-xs text-primary">{st.code}</div>
                <div className="font-display text-2xl mt-2">{s(st.name)}</div>
                <div className="font-mono text-[11px] text-muted-foreground mt-2">
                  {s(st.period)}
                </div>
              </div>
              <div className="lg:col-span-9">
                <p className="text-sm leading-relaxed">{s(st.scope)}</p>
                <div className="eyebrow mt-6">
                  {lang === "fr" ? "Livrables" : "Deliverables"}
                </div>
                <ul className="mt-3 grid sm:grid-cols-2 gap-x-8 gap-y-2">
                  {st.deliverables.map((d) => (
                    <li key={d.en} className="text-sm text-foreground/80 flex gap-2 leading-relaxed">
                      <span className="text-primary font-mono" aria-hidden>
                        —
                      </span>
                      {s(d)}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-primary pt-3">
                  <div className="eyebrow text-primary">
                    {lang === "fr" ? "Critère de sortie" : "Exit criterion"}
                  </div>
                  <div className="text-sm mt-2">{s(st.exit)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 3 — Relations */}
      <Section className="rule-line">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-primary">03</span>
          <h2 className="font-display text-3xl md:text-4xl">
            {lang === "fr" ? "Relations entre produits" : "Relations between products"}
          </h2>
        </div>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground leading-relaxed">
          {lang === "fr"
            ? "Ce que chaque entité exige pour exister, et ce qu'elle rend possible ensuite. L'ordre de lancement découle de cette table, pas de l'inverse."
            : "What each entity requires in order to exist, and what it then makes possible. Launch order follows from this table, not the other way round."}
        </p>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-foreground/20">
                <th className="text-left py-3 pr-4 eyebrow">
                  {lang === "fr" ? "Entité" : "Entity"}
                </th>
                <th className="text-left py-3 pr-4 eyebrow">
                  {lang === "fr" ? "Dépend de" : "Depends on"}
                </th>
                <th className="text-left py-3 pr-4 eyebrow">
                  {lang === "fr" ? "Rend possible" : "Enables"}
                </th>
                <th className="text-left py-3 eyebrow">
                  {lang === "fr" ? "Lecture" : "Reading"}
                </th>
              </tr>
            </thead>
            <tbody>
              {RELATIONS.map((r) => (
                <tr key={r.code} className="border-b border-border align-top">
                  <td className="py-4 pr-4 font-mono text-xs whitespace-nowrap">{r.code}</td>
                  <td className="py-4 pr-4 text-xs text-muted-foreground">
                    {r.needs.length ? r.needs.join(" · ") : "—"}
                  </td>
                  <td className="py-4 pr-4 text-xs text-primary">{r.serves.join(" · ")}</td>
                  <td className="py-4 text-xs text-foreground/80 leading-relaxed">{s(r.note)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 4 — Rules */}
      <Section className="rule-line">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-primary">04</span>
          <h2 className="font-display text-3xl md:text-4xl">
            {lang === "fr" ? "Règles non négociables" : "Non-negotiable rules"}
          </h2>
        </div>
        <ol className="mt-10 grid gap-px bg-border md:grid-cols-2">
          {IMPL_RULES.map((r, i) => (
            <li key={r.en} className="bg-background p-7 flex gap-5">
              <span className="font-mono text-xs text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed">{s(r)}</span>
            </li>
          ))}
        </ol>
      </Section>
    </SiteShell>
  );
}
