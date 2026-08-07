import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dict } from "./translations";
import { convertMoneyStr } from "./money";
import * as RAW from "./sight-data";

export type Lang = "fr" | "en";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangCtx = createContext<Ctx>({ lang: "fr", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sight.lang");
      if (saved === "fr" || saved === "en") setLang(saved);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("sight.lang", lang);
      if (typeof document !== "undefined") document.documentElement.lang = lang;
    } catch {}
  }, [lang]);
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);

export function useT() {
  const { lang } = useLang();
  return useMemo(() => {
    return (s: string): string => {
      if (typeof s !== "string") return s;
      const translated = lang === "fr" ? dict[s] ?? s : s;
      return convertMoneyStr(translated);
    };
  }, [lang]);
}

function deepT(value: unknown, t: (s: string) => string): unknown {
  if (typeof value === "string") return t(value);
  if (Array.isArray(value)) return value.map((v) => deepT(v, t));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const k in value as Record<string, unknown>) {
      out[k] = deepT((value as Record<string, unknown>)[k], t);
    }
    return out;
  }
  return value;
}

export function useLocalizedData() {
  const t = useT();
  return useMemo(
    () => ({
      SIGHT: deepT(RAW.SIGHT, t) as typeof RAW.SIGHT,
      NAV: RAW.NAV.map((n) => ({ ...n, label: t(n.label) })),
      END_STATE_2036: deepT(RAW.END_STATE_2036, t) as typeof RAW.END_STATE_2036,
      ROADMAP: deepT(RAW.ROADMAP, t) as typeof RAW.ROADMAP,
      ROADMAP_20Y: deepT(RAW.ROADMAP_20Y, t) as typeof RAW.ROADMAP_20Y,
      PRODUCTS: deepT(RAW.PRODUCTS, t) as typeof RAW.PRODUCTS,
      FUTURE_PRODUCTS: deepT(RAW.FUTURE_PRODUCTS, t) as typeof RAW.FUTURE_PRODUCTS,
      ORG: deepT(RAW.ORG, t) as typeof RAW.ORG,
      PHASES: deepT(RAW.PHASES, t) as typeof RAW.PHASES,
      FINANCIAL_STRATEGY: deepT(RAW.FINANCIAL_STRATEGY, t) as typeof RAW.FINANCIAL_STRATEGY,
      PLAYBOOK: deepT(RAW.PLAYBOOK, t) as typeof RAW.PLAYBOOK,
      ECOSYSTEM: deepT(RAW.ECOSYSTEM, t) as typeof RAW.ECOSYSTEM,
    }),
    [t],
  );
}
