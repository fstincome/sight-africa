import { useEffect, useRef, useState } from "react";

type Thumb = { page: number; url: string };

export function PdfThumbnails({
  src,
  onSelect,
  activePage,
  onProgress,
}: {
  src: string;
  onSelect?: (page: number) => void;
  activePage?: number;
  onProgress?: (info: { rendered: number; total: number; done: boolean }) => void;
}) {
  const [thumbs, setThumbs] = useState<Thumb[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    setLoading(true);
    setError(null);
    setThumbs([]);
    setTotal(0);
    onProgress?.({ rendered: 0, total: 0, done: false });

    (async () => {
      try {
        const pdfjs: any = await import("pdfjs-dist/build/pdf.mjs");
        const workerSrc = (await import("pdfjs-dist/build/pdf.worker.mjs?url")).default;
        pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

        const pdf = await pdfjs.getDocument(src).promise;
        if (cancelled.current) return;
        const n = pdf.numPages;
        setTotal(n);
        onProgress?.({ rendered: 0, total: n, done: false });

        for (let i = 1; i <= n; i++) {
          if (cancelled.current) return;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1 });
          const targetWidth = 220;
          const scale = targetWidth / viewport.width;
          const scaled = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          canvas.width = scaled.width;
          canvas.height = scaled.height;
          const ctx = canvas.getContext("2d")!;
          await page.render({ canvasContext: ctx, viewport: scaled, canvas }).promise;
          const url = canvas.toDataURL("image/jpeg", 0.7);
          if (cancelled.current) return;
          setThumbs((prev) => {
            const next = [...prev, { page: i, url }];
            onProgress?.({ rendered: next.length, total: n, done: next.length === n });
            return next;
          });
        }
        setLoading(false);
      } catch (e: any) {
        if (!cancelled.current) {
          setError(e?.message ?? "Failed to render previews");
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled.current = true;
    };
  }, [src]);

  const rendered = thumbs.length;
  const pct = total > 0 ? Math.round((rendered / total) * 100) : 0;

  return (
    <div className="border border-border bg-muted/30 h-[80vh] overflow-y-auto p-3">
      <div className="sticky top-0 -mx-3 -mt-3 mb-3 px-3 pt-3 pb-2 bg-muted/80 backdrop-blur border-b border-border z-10">
        <div className="flex items-center justify-between text-[11px] tracking-wide text-muted-foreground mb-1">
          <span>
            {total > 0 ? `${rendered} / ${total} pages` : "Loading document…"}
          </span>
          <span>{loading ? `${pct}%` : "ready"}</span>
        </div>
        <div className="h-1 w-full bg-border overflow-hidden">
          <div
            className={`h-full bg-primary transition-all duration-300 ${
              total === 0 ? "animate-pulse w-1/3" : ""
            }`}
            style={total > 0 ? { width: `${pct}%` } : undefined}
          />
        </div>
      </div>

      {error && <div className="text-xs text-destructive p-2">{error}</div>}

      <ul className="space-y-3">
        {thumbs.map((t) => {
          const active = activePage === t.page;
          return (
            <li key={t.page}>
              <button
                type="button"
                onClick={() => onSelect?.(t.page)}
                className={`group block w-full text-left transition ${
                  active ? "ring-2 ring-primary" : "ring-1 ring-border hover:ring-foreground"
                }`}
              >
                <img
                  src={t.url}
                  alt={`Page ${t.page}`}
                  className="w-full block bg-white"
                  loading="lazy"
                />
                <div className="text-[11px] tracking-wide text-muted-foreground px-1 py-1 flex justify-between">
                  <span>Page {t.page}</span>
                  {active && <span className="text-primary">● viewing</span>}
                </div>
              </button>
            </li>
          );
        })}
        {loading &&
          total > 0 &&
          Array.from({ length: Math.max(0, total - rendered) }).slice(0, 6).map((_, idx) => (
            <li key={`skeleton-${idx}`}>
              <div className="w-full aspect-[1/1.3] bg-muted animate-pulse ring-1 ring-border" />
              <div className="text-[11px] tracking-wide text-muted-foreground px-1 py-1">
                Page {rendered + idx + 1}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
