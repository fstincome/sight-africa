import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";
import { END_STATE_2035 } from "@/lib/sight-data";

export const Route = createFileRoute("/vision-2035")({
  head: () => ({
    meta: [
      { title: "Vision 2035 — SIGHT AFRICA" },
      { name: "description", content: "What success looks like in 2035: market position, products, users, revenue, employees, geographic presence and strategic influence." },
      { property: "og:title", content: "Vision 2035 — SIGHT AFRICA" },
      { property: "og:description", content: "The end-state of SIGHT AFRICA in 2035." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Part 01 · The future end state"
        title="In 2035, SIGHT AFRICA is the operator of East Africa's digital backbone."
        lead={END_STATE_2035.position}
      />
      <Section className="rule-line">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {END_STATE_2035.stats.map((s) => (
            <div key={s.k} className="bg-background p-6">
              <div className="eyebrow">{s.k}</div>
              <div className="font-display text-4xl mt-3">{s.v}</div>
              <div className="text-xs text-muted-foreground mt-2">{s.note}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="rule-line">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="eyebrow">Strategic influence</div>
            <h2 className="font-display text-4xl mt-3 leading-tight">More than a company — a piece of national infrastructure.</h2>
          </div>
          <ul className="space-y-5">
            {END_STATE_2035.influence.map((i, idx) => (
              <li key={i} className="flex gap-4 border-t border-border pt-5">
                <span className="font-mono text-xs text-primary mt-1">0{idx + 1}</span>
                <span className="text-lg leading-relaxed">{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="rule-line">
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { t: "Products at maturity", b: "My Satoshis, Yepo, AFJ and LEARN BTC have evolved into full subsidiaries operating alongside SIGHT PAY, ID, CLOUD, DATA, SECURITY, COMPUTE, MARKET, GOV, HEALTH, AGRI, MEDIA, ACADEMY, CAPITAL, LABS and FOUNDATION." },
            { t: "Geographic presence", b: "Operating entities in Burundi, Rwanda, DRC, Tanzania, Kenya, Uganda — with revenue from Ethiopia, Zambia and selected pan-African corridors." },
            { t: "Capital structure", b: "Either publicly listed on a regional exchange or anchored by long-duration strategic capital from sovereign and development funds." },
          ].map((x) => (
            <div key={x.t}>
              <div className="font-display text-2xl">{x.t}</div>
              <p className="mt-3 text-muted-foreground leading-relaxed">{x.b}</p>
            </div>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
