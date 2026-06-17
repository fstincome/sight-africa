import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader, Section, Eyebrow } from "@/components/site-shell";
import { useLocalizedData, useT } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SIGHT AFRICA — Infrastructure numérique de l'Afrique de l'Est" },
      {
        name: "description",
        content:
          "SIGHT AFRICA est un futur groupe technologique africain bâtissant l'infrastructure numérique critique du Burundi et de l'Afrique de l'Est. Blueprint stratégique 10 ans.",
      },
      { property: "og:title", content: "SIGHT AFRICA — Strategic Operating System" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <Hero />
      <Pillars />
      <NorthStar />
      <CurrentStack />
      <FutureGrid />
      <CTA />
    </SiteShell>
  );
}

function Hero() {
  const t = useT();
  return (
    <section className="container-x pt-24 pb-24 lg:pt-32">
      <Eyebrow>{t("Strategic Operating System · 2026 → 2035")}</Eyebrow>
      <h1 className="font-display text-[3.2rem] sm:text-7xl lg:text-[6.5rem] leading-[0.92] tracking-tight mt-6 max-w-5xl">
        {t("Building the digital infrastructure of")} <em className="italic text-primary not-italic font-display">{t("East Africa")}</em>.
      </h1>
      <div className="mt-10 grid md:grid-cols-3 gap-8 max-w-5xl">
        <p className="md:col-span-2 text-xl text-foreground/80 leading-relaxed">
          {t("SIGHT AFRICA is not a software agency. It is a future African technology group whose mission is to build the rails — payments, identity, cloud, AI, education, media — that allow Burundi and East Africa to participate in the global digital economy on their own terms.")}
        </p>
        <div className="flex flex-col gap-3">
          <Link to="/vision-2035" className="inline-flex items-center justify-between gap-3 px-5 py-4 bg-foreground text-background hover:bg-primary transition-colors text-sm">
            {t("Read the 2035 end state")} <span>→</span>
          </Link>
          <Link to="/roadmap" className="inline-flex items-center justify-between gap-3 px-5 py-4 border border-border hover:border-foreground transition-colors text-sm">
            {t("Year-by-year roadmap")} <span>→</span>
          </Link>
        </div>
      </div>

      <div className="rule-line mt-20 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {[
          ["Geography", "Burundi → East Africa → AU"],
          ["Horizon", "10 years (2026–2035)"],
          ["Subsidiaries planned", "15+"],
          ["Target ARR 2035", "$640M"],
        ].map(([k, v]) => (
          <div key={k}>
            <div className="eyebrow">{t(k)}</div>
            <div className="font-display text-2xl mt-2">{t(v)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pillars() {
  const t = useT();
  const { SIGHT } = useLocalizedData();
  return (
    <Section className="rule-line">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <Eyebrow>{t("Foundational beliefs")}</Eyebrow>
          <h2 className="font-display text-4xl mt-3 leading-tight">
            {t("We are building for decades, not quarters.")}
          </h2>
        </div>
        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-8">
          {[
            { t: "Vision", b: SIGHT.vision },
            { t: "Mission", b: SIGHT.mission },
            { t: "Values", b: SIGHT.values.join(" · ") },
            { t: "Architecture", b: t("A holding group of focused subsidiaries sharing payments, identity, cloud, data and security as common infrastructure.") },
          ].map((x) => (
            <div key={x.t} className="border-t border-foreground pt-5">
              <div className="font-mono text-xs uppercase tracking-widest text-primary">{t(x.t)}</div>
              <p className="mt-3 text-base text-foreground/80 leading-relaxed">{x.b}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function NorthStar() {
  const t = useT();
  const { END_STATE_2035 } = useLocalizedData();
  return (
    <Section className="rule-line">
      <Eyebrow>{t("North star · 2035")}</Eyebrow>
      <h2 className="font-display text-4xl md:text-6xl mt-3 max-w-4xl leading-[1.05]">
        {END_STATE_2035.position}
      </h2>
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
        {END_STATE_2035.stats.map((s) => (
          <div key={s.k} className="bg-background p-6">
            <div className="eyebrow">{s.k}</div>
            <div className="font-display text-2xl mt-3 break-words">{s.v}</div>
            <div className="text-xs text-muted-foreground mt-2 leading-relaxed">{s.note}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function CurrentStack() {
  const t = useT();
  const { PRODUCTS } = useLocalizedData();
  return (
    <Section className="rule-line">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <Eyebrow>{t("The four assets we operate today")}</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl mt-3">{t("A working foundation.")}</h2>
        </div>
        <Link to="/products" className="text-sm text-primary hover:underline">
          {t("Full product evolution →")}
        </Link>
      </div>
      <div className="mt-10 grid md:grid-cols-2 gap-px bg-border">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="bg-background p-8">
            <div className="flex items-center justify-between">
              <div className="font-mono text-xs tracking-widest text-primary">{p.name}</div>
              <div className="text-xs text-muted-foreground">{t("Mature → infrastructure")}</div>
            </div>
            <p className="font-display text-2xl mt-4 leading-snug">{p.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.stages.map((s) => (
                <span key={s.label} className="text-[11px] font-mono px-2 py-1 border border-border text-muted-foreground">
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FutureGrid() {
  const t = useT();
  const { FUTURE_PRODUCTS } = useLocalizedData();
  return (
    <Section className="rule-line">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <Eyebrow>{t("What logically emerges")}</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">
            {t("15 subsidiaries the next decade demands.")}
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            {t("From sovereign cloud to GPU compute, from a digital identity layer to a public-interest foundation — each entity exists because the ecosystem requires it.")}
          </p>
          <Link to="/future-products" className="inline-block mt-6 text-sm text-primary hover:underline">
            {t("See why each must exist →")}
          </Link>
        </div>
        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-border self-start">
          {FUTURE_PRODUCTS.slice(0, 8).map((f) => (
            <div key={f.code} className="bg-background p-5">
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs tracking-widest">{f.code}</div>
                <div className="font-mono text-[10px] text-primary">{f.born}</div>
              </div>
              <div className="text-sm mt-2">{f.role}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CTA() {
  const t = useT();
  const links: Array<[string, string, string]> = [
    ["Vision 2035", "/vision-2035", "Market position, scale, influence"],
    ["10-Year Roadmap", "/roadmap", "Year by year, 2026 → 2035"],
    ["Products", "/products", "Today → 1y → 5y → 10y → mature"],
    ["Future Build", "/future-products", "15 subsidiaries — why each"],
    ["Organization", "/organization", "From 15 people to 4,800"],
    ["Phases", "/phases", "Foundation → Infrastructure Leadership"],
    ["Financials", "/financials", "Bootstrap, grants, venture, IPO"],
    ["Playbook", "/playbook", "Build, wait, outsource, automate"],
    ["Ecosystem", "/ecosystem", "Group · Infra · Platforms · Voice"],
  ];
  return (
    <Section className="rule-line">
      <Eyebrow>{t("Read the operating system")}</Eyebrow>
      <h2 className="font-display text-4xl mt-3">{t("Nine documents. One blueprint.")}</h2>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {links.map(([title, to, d]) => (
          <Link key={to} to={to} className="bg-background p-6 group hover:bg-secondary transition-colors">
            <div className="flex items-center justify-between">
              <div className="font-display text-2xl">{t(title)}</div>
              <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <div className="text-sm text-muted-foreground mt-2">{t(d)}</div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
