import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";
import { useLocalizedData, useT } from "@/lib/i18n";

export const Route = createFileRoute("/vision-2036")({
  head: () => ({
    meta: [{ title: "Vision 2036 — SIGHT AFRICA" }],
  }),
  component: Page,
});

function Page() {
  const t = useT();
  const { END_STATE_2036 } = useLocalizedData();
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Part 01 · The future end state"
        title="In 2036, SIGHT AFRICA is the operator of East Africa's digital backbone."
        lead={END_STATE_2036.position}
      />
      <Section className="rule-line">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {END_STATE_2036.stats.map((s) => (
            <div key={s.k} className="bg-background p-6">
              <div className="eyebrow">{s.k}</div>
              <div className="font-display text-2xl mt-3 break-words">{s.v}</div>
              <div className="text-xs text-muted-foreground mt-2">{s.note}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="rule-line">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="eyebrow">{t("Strategic influence")}</div>
            <h2 className="font-display text-4xl mt-3 leading-tight">{t("More than a company — a piece of national infrastructure.")}</h2>
          </div>
          <ul className="space-y-5">
            {END_STATE_2036.influence.map((i, idx) => (
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
              <div className="font-display text-2xl">{t(x.t)}</div>
              <p className="mt-3 text-muted-foreground leading-relaxed">{t(x.b)}</p>
            </div>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
