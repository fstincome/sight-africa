import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AuthCtx = {
  authed: boolean;
  signIn: (email: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  signOut: () => Promise<void>;
};
const Ctx = createContext<AuthCtx>({
  authed: false,
  signIn: async () => ({ ok: false, error: "not initialized" }),
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    localStorage.removeItem("sight.auth.v1");
    fetch("/api/site-session", { credentials: "same-origin", cache: "no-store" })
      .then((response) => response.ok ? response.json() : { authed: false })
      .then((session) => setAuthed(session.authed === true)).catch(() => setAuthed(false));
  }, []);

  const signIn: AuthCtx["signIn"] = async (email, password) => {
    try {
      const response = await fetch("/api/site-session", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ email, password }) });
      if (response.ok) { setAuthed(true); return { ok: true }; }
    } catch {
      return { ok: false, error: "Connexion indisponible / Connection unavailable" };
    }
    return { ok: false, error: "Identifiants invalides / Invalid credentials" };
  };

  const signOut = async () => {
    const response = await fetch("/api/site-session", { method: "DELETE", credentials: "same-origin" });
    if (!response.ok) return;
    setAuthed(false);
    window.location.reload();
  };

  return <Ctx.Provider value={{ authed, signIn, signOut }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
