import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";
import { useLocalizedData, useT } from "@/lib/i18n";

export const Route = createFileRoute("/financials")({
  head: () => ({ meta: [
  {
    "title": "Stratégie financière — SIGHT AFRICA"
  },
  {
    "name": "description",
    "content": "Financement et allocation du capital de SIGHT AFRICA, avec objectifs financiers en FBU."
  },
  {
    "property": "og:title",
    "content": "Stratégie financière — SIGHT AFRICA"
  },
  {
    "property": "og:description",
    "content": "Financement et allocation du capital de SIGHT AFRICA, avec objectifs financiers en FBU."
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
  const { FINANCIAL_STRATEGY } = useLocalizedData();
  const headers = ["Phase", "Bootstrap", "Revenue", "Grants", "Partnerships", "Investors", "Venture", "Sustainability"];
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Part 07 · Financial strategy"
        title="Capital matched to the duration of the asset."
        lead="Short-cycle products fund themselves. Infrastructure requires patient, long-duration capital. The art is sequencing both — and never raising equity for something a partnership or grant can fund."
      />
      <Section className="rule-line">
        <div className="overflow-x-auto rule-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                {headers.map((h) => (
                  <th key={h} className="eyebrow font-normal text-left p-4 border-b border-foreground align-top">
                    {t(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FINANCIAL_STRATEGY.map((row) => (
                <tr key={row.phase} className="align-top border-b border-border">
                  <td className="p-4 font-display text-xl whitespace-nowrap">{row.phase}</td>
                  <td className="p-4 text-foreground/80">{row.bootstrap}</td>
                  <td className="p-4 text-foreground/80">{row.revenue}</td>
                  <td className="p-4 text-foreground/80">{row.grants}</td>
                  <td className="p-4 text-foreground/80">{row.partnerships}</td>
                  <td className="p-4 text-foreground/80">{row.investors}</td>
                  <td className="p-4 text-foreground/80 font-mono text-xs">{row.venture}</td>
                  <td className="p-4 text-foreground/80">{row.sustainability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </SiteShell>
  );
}
