import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// NOTE: simple client-side gate. Confidential reading only — not real security.
const ALLOWED_EMAIL = "advaxe.mucatcha@gmail.com";
const ALLOWED_PASSWORD = "Nadvaxe2025";
const STORAGE_KEY = "sight.auth.v1";

type AuthCtx = {
  authed: boolean;
  signIn: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  signOut: () => void;
};
const Ctx = createContext<AuthCtx>({
  authed: false,
  signIn: () => ({ ok: false, error: "not initialized" }),
  signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setAuthed(true);
    } catch {}
  }, []);

  const signIn: AuthCtx["signIn"] = (email, password) => {
    if (email.trim().toLowerCase() === ALLOWED_EMAIL && password === ALLOWED_PASSWORD) {
      try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
      setAuthed(true);
      return { ok: true };
    }
    return { ok: false, error: "Identifiants invalides / Invalid credentials" };
  };

  const signOut = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setAuthed(false);
  };

  return <Ctx.Provider value={{ authed, signIn, signOut }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
