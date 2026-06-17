import { useLang } from "@/lib/i18n";

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`inline-flex items-center font-mono text-[11px] border border-border ${className}`}>
      <button
        onClick={() => setLang("fr")}
        className={`px-2 py-1 ${lang === "fr" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
        aria-label="Français"
      >FR</button>
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-1 ${lang === "en" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
        aria-label="English"
      >EN</button>
    </div>
  );
}
