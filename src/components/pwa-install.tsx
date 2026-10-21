import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import sightLogo from "@/assets/sight-logo.png.asset.json";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "sight.pwa.dismissed.v1";

export function PWAInstallPrompt() {
  const { lang } = useLang();
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
      try {
        if (localStorage.getItem(DISMISS_KEY) !== "1") setOpen(true);
      } catch {
        setOpen(true);
      }
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    const onInstalled = () => setOpen(false);
    window.addEventListener("appinstalled", onInstalled);
    return () => window.removeEventListener("appinstalled", onInstalled);
  }, []);

  if (!open || !deferred) return null;

  const L = lang === "fr" ? FR : EN;

  const install = async () => {
    await deferred.prompt();
    await deferred.userChoice.catch(() => {});
    setOpen(false);
  };
  const dismiss = () => {
    try { localStorage.setItem(DISMISS_KEY, "1"); } catch {}
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-foreground/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-background border border-border shadow-xl">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <img src={sightLogo.url} alt="" className="h-10 w-auto object-contain" />
            <div className="font-mono text-[10px] tracking-widest uppercase text-primary">{L.eyebrow}</div>
          </div>
          <h3 className="font-display text-2xl mt-4 leading-tight">{L.title}</h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{L.lead}</p>
          <div className="mt-6 flex gap-2">
            <button
              onClick={install}
              className="flex-1 bg-foreground text-background py-3 text-sm hover:bg-primary transition-colors"
            >
              {L.install}
            </button>
            <button
              onClick={dismiss}
              className="px-4 py-3 text-sm border border-border text-muted-foreground hover:text-foreground"
            >
              {L.later}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const FR = {
  eyebrow: "Installation",
  title: "Installer SIGHT HUB sur votre appareil",
  lead: "SIGHT HUB",
  install: "Installer l'application",
  later: "Plus tard",
};
const EN = {
  eyebrow: "Install",
  title: "Install SIGHT HUB on your device",
  lead: "SIGHT HUB",
  install: "Install app",
  later: "Later",
};
