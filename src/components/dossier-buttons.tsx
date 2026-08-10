import { useT } from "@/lib/i18n";

export function DossierButtons({ id, name }: { id: string; name: string }) {
  const t = useT();
  const pdf = `/dossiers/${id}.pdf`;
  const docx = `/dossiers/${id}.docx`;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={pdf}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-2 text-xs tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition"
        aria-label={`${t("View PDF dossier")} — ${name}`}
      >
        <span aria-hidden>▤</span> {t("View PDF dossier")}
      </a>
      <a
        href={pdf}
        download
        className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs tracking-widest uppercase hover:border-foreground transition"
      >
        ↓ PDF
      </a>
      <a
        href={docx}
        download
        className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs tracking-widest uppercase text-muted-foreground hover:border-foreground hover:text-foreground transition"
      >
        ↓ Word
      </a>
    </div>
  );
}
