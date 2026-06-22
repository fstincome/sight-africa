import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";
import { PdfThumbnails } from "@/components/pdf-thumbnails";

export const Route = createFileRoute("/blueprint")({
  component: BlueprintPage,
  head: () => ({
    meta: [
      { title: "Blueprint — SIGHT AFRICA" },
      { name: "description", content: "Downloadable Word and PDF document of the full SIGHT AFRICA 10-year strategy." },
    ],
  }),
});

const DOCX = "/sight-africa-blueprint.docx";
const PDF = "/sight-africa-blueprint.pdf";

function BlueprintPage() {
  const [page, setPage] = useState(1);

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Document · English · FBU"
        title="The full blueprint, side by side."
        lead="Scan every page on the left, read on the right. Available as Word (.docx) and PDF — read inline or download."
      />
      <Section>
        <div className="flex flex-wrap gap-3 mb-10">
          <a href={DOCX} download className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
            ↓ Download .docx
          </a>
          <a href={PDF} download className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background text-sm font-medium hover:opacity-90">
            ↓ Download .pdf
          </a>
          <a href={DOCX} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 border border-border text-sm font-medium hover:bg-muted">
            Open Word
          </a>
          <a href={PDF} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 border border-border text-sm font-medium hover:bg-muted">
            Open PDF
          </a>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow mb-3">Pages</div>
            <PdfThumbnails src={PDF} activePage={page} onSelect={setPage} />
            <p className="text-xs text-muted-foreground mt-2">
              Click any page to jump there in the reader.
            </p>
          </div>

          <div className="col-span-12 md:col-span-5">
            <div className="eyebrow mb-3">PDF reader · page {page}</div>
            <div className="border border-border bg-muted/30 h-[80vh] overflow-hidden">
              <iframe
                key={page}
                title="SIGHT AFRICA Blueprint — PDF"
                src={`${PDF}#page=${page}&view=FitH`}
                className="w-full h-full"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Rendered by your browser PDF viewer.
            </p>
          </div>

          <div className="col-span-12 md:col-span-4">
            <div className="eyebrow mb-3">Word (.docx) preview</div>
            <div className="border border-border bg-muted/30 h-[80vh] overflow-hidden">
              <iframe
                title="SIGHT AFRICA Blueprint — Word"
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                  (typeof window !== "undefined" ? window.location.origin : "https://sight-africa.lovable.app") + DOCX
                )}`}
                className="w-full h-full"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Inline via Microsoft Office viewer. If blocked, use the download buttons above.
            </p>
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
              <li>· Currency: amounts in FBU calibrated to the Burundian economy.</li>
              <li>· Classification: Confidential — distribute only to authorized stakeholders.</li>
            </ul>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
