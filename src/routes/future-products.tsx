import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";
import { FUTURE_PRODUCTS } from "@/lib/sight-data";

export const Route = createFileRoute("/future-products")({
  head: () => ({
    meta: [
      { title: "Future Build — SIGHT AFRICA" },
      { name: "description", content: "The 15 subsidiaries SIGHT AFRICA will build over the next decade — cloud, identity, payments, data, security, compute, capital, academy, foundation and more." },
      { property: "og:title", content: "Future Build — SIGHT AFRICA" },
      { property: "og:description", content: "Every future product. Why each must exist." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Part 04 · Future products"
        title="Fifteen entities the decade will demand."
        lead="None of these are speculative. Each emerges from the logic of the ecosystem — once you own payments you need identity; once you own identity you need a cloud; once you own a cloud you need security; and once you own all of that, you need compute."
      />
      <Section className="rule-line">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {FUTURE_PRODUCTS.map((f, i) => (
            <div key={f.code} className="bg-background p-7">
              <div className="flex items-baseline justify-between">
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  /{String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-mono text-[10px] text-primary">BORN · {f.born}</div>
              </div>
              <div className="font-display text-3xl mt-4">{f.code}</div>
              <div className="text-sm text-primary mt-1">{f.role}</div>
              <p className="mt-4 text-sm text-foreground/80 leading-relaxed">{f.why}</p>
            </div>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
