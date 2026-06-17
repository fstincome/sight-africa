import { useState, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import sightLogo from "@/assets/sight-logo.png.asset.json";

export function LoginGate({ children }: { children: ReactNode }) {
  const { authed } = useAuth();
  if (!authed) return <LoginScreen />;
  return <>{children}</>;
}

function LoginScreen() {
  const { signIn } = useAuth();
  const { lang, setLang } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const L = lang === "fr" ? FR : EN;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = signIn(email, password);
    if (!r.ok) setError(r.error);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="container-x h-16 flex items-center justify-between">
        <img src={sightLogo.url} alt="SIGHT AFRICA" className="h-9 w-auto object-contain" />
        <div className="flex items-center gap-1 font-mono text-xs">
          <button
            onClick={() => setLang("fr")}
            className={`px-2 py-1 ${lang === "fr" ? "text-foreground border-b border-primary" : "text-muted-foreground"}`}
          >FR</button>
          <button
            onClick={() => setLang("en")}
            className={`px-2 py-1 ${lang === "en" ? "text-foreground border-b border-primary" : "text-muted-foreground"}`}
          >EN</button>
        </div>
      </header>

      <main className="flex-1 container-x flex items-center justify-center py-16">
        <div className="w-full max-w-md">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary">{L.eyebrow}</div>
          <h1 className="font-display text-5xl mt-3 leading-[1.05]">{L.title}</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">{L.lead}</p>

          <form onSubmit={submit} className="mt-10 space-y-5">
            <div>
              <label className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">{L.email}</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                className="mt-2 w-full bg-transparent border-b border-foreground/40 py-3 text-base outline-none focus:border-primary"
                placeholder="you@domain.com"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">{L.password}</label>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null); }}
                className="mt-2 w-full bg-transparent border-b border-foreground/40 py-3 text-base outline-none focus:border-primary"
                placeholder="••••••••"
              />
            </div>
            {error && <div className="text-sm text-destructive font-mono">{error}</div>}
            <button
              type="submit"
              className="w-full mt-4 bg-foreground text-background py-4 text-sm hover:bg-primary transition-colors"
            >
              {L.cta} →
            </button>
          </form>

          <p className="mt-8 text-xs text-muted-foreground leading-relaxed">{L.note}</p>
        </div>
      </main>

      <footer className="container-x py-6 text-xs text-muted-foreground flex justify-between">
        <span>© {new Date().getFullYear()} SIGHT AFRICA</span>
        <span className="font-mono">confidential / confidentiel</span>
      </footer>
    </div>
  );
}

const FR = {
  eyebrow: "Accès confidentiel",
  title: "SIGHT AFRICA — Blueprint stratégique.",
  lead: "Ce document est confidentiel. Veuillez vous authentifier pour consulter le plan d'exécution sur 10 ans.",
  email: "Email",
  password: "Mot de passe",
  cta: "Se connecter",
  note: "Lecture seule. Tous les montants sont exprimés en Francs Burundais (FBU). Taux de conversion indicatif : 1 USD ≈ 2 950 FBU.",
};
const EN = {
  eyebrow: "Confidential access",
  title: "SIGHT AFRICA — Strategic Blueprint.",
  lead: "This document is confidential. Please authenticate to access the 10-year execution plan.",
  email: "Email",
  password: "Password",
  cta: "Sign in",
  note: "Read-only. All amounts are displayed in Burundian Franc (FBU). Indicative rate: 1 USD ≈ 2,950 FBU.",
};
