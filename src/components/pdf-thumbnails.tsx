import { useEffect, useRef, useState } from "react";

type Thumb = { page: number; url: string };

export function PdfThumbnails({
  src,
  onSelect,
  activePage,
}: {
  src: string;
  onSelect?: (page: number) => void;
  activePage?: number;
}) {
  const [thumbs, setThumbs] = useState<Thumb[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    setLoading(true);
    setError(null);
    setThumbs([]);

    (async () => {
      try {
        const pdfjs: any = await import("pdfjs-dist/build/pdf.mjs");
        const workerSrc = (await import("pdfjs-dist/build/pdf.worker.mjs?url")).default;
        pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

        const loadingTask = pdfjs.getDocument(src);
        const pdf = await loadingTask.promise;
        const total = pdf.numPages;

        for (let i = 1; i <= total; i++) {
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
          setThumbs((prev) => [...prev, { page: i, url }]);
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

  return (
    <div className="border border-border bg-muted/30 h-[80vh] overflow-y-auto p-3">
      {error && <div className="text-xs text-destructive p-2">{error}</div>}
      {!error && thumbs.length === 0 && loading && (
        <div className="text-xs text-muted-foreground p-2">Rendering previews…</div>
      )}
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
      </ul>
      {loading && thumbs.length > 0 && (
        <div className="text-[11px] text-muted-foreground p-2">Loading more…</div>
      )}
    </div>
  );
}
