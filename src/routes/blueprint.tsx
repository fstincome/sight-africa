import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";

export const Route = createFileRoute("/blueprint")({
  component: BlueprintPage,
  head: () => ({
    meta: [
      { title: "Blueprint — SIGHT AFRICA" },
      { name: "description", content: "Downloadable English Word document of the full SIGHT AFRICA 10-year strategy." },
    ],
  }),
});

const FILE = "/sight-africa-blueprint.docx";

function BlueprintPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Document · English · FBU"
        title="The full blueprint, in one Word document."
        lead="Read it inline or download it. Same content as the menu (Overview → Ecosystem), rendered as a single English document with every amount converted to Burundian Francs."
      />
      <Section>
        <div className="flex flex-wrap gap-3 mb-8">
          <a
            href={FILE}
            download
            className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
          >
            ↓ Download .docx
          </a>
          <a
            href={FILE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 border border-border text-sm font-medium hover:bg-muted"
          >
            Open in new tab
          </a>
        </div>

        <div className="rule-line pt-6">
          <div className="eyebrow mb-3">Preview</div>
          <p className="text-sm text-muted-foreground mb-4">
            Inline preview rendered through Microsoft Office viewer. If it does not load (private network),
            use the download button above — the file is identical.
          </p>
          <div className="border border-border bg-muted/30 aspect-[3/4] md:aspect-[4/3] w-full overflow-hidden">
            <iframe
              title="SIGHT AFRICA Blueprint"
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                (typeof window !== "undefined" ? window.location.origin : "https://sight-africa.lovable.app") + FILE
              )}`}
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
          <div>
            <div className="eyebrow mb-2">Contents</div>
            <ol className="space-y-1 list-decimal list-inside">
              <li>Overview</li>
              <li>Vision 2035</li>
              <li>Roadmap 2026–2035</li>
              <li>Products — evolution</li>
              <li>Future build — subsidiaries</li>
              <li>Organization</li>
              <li>Phases</li>
              <li>Financial strategy</li>
              <li>Execution playbook</li>
              <li>Ecosystem map</li>
            </ol>
          </div>
          <div>
            <div className="eyebrow mb-2">Notes</div>
            <ul className="space-y-2">
              <li>· Language: English (single language for institutional sharing).</li>
              <li>· Currency: all amounts in FBU using the indicative rate 1 USD ≈ 2,950 FBU.</li>
              <li>· Classification: Confidential — distribute only to authorized stakeholders.</li>
            </ul>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
