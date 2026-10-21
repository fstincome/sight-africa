export type SiteAccessConfig = { email?: string; password?: string; sessionSecret?: string };
const COOKIE = "sight_session";
const SESSION_SECONDS = 12 * 60 * 60;
const encoder = new TextEncoder();

async function equalSecret(a: string, b: string) {
  const [left, right] = await Promise.all([a, b].map(async (value) => new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)))));
  let difference = 0;
  for (let i = 0; i < left.length; i++) difference |= left[i] ^ right[i];
  return difference === 0;
}

async function signature(payload: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return Array.from(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(payload))), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function headers() {
  return { "Cache-Control": "private, no-store, max-age=0", "X-Robots-Tag": "noindex, nofollow", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "same-origin" };
}

export async function handleSiteAccess(request: Request, config: SiteAccessConfig): Promise<Response | null> {
  const url = new URL(request.url);
  const endpoint = url.pathname === "/api/site-session";
  if (!config.email || !config.password || !config.sessionSecret || config.sessionSecret.length < 32) {
    return new Response("SIGHT HUB — accès indisponible. Configurez SITE_EMAIL, SITE_PASSWORD et SESSION_SECRET sur votre hébergement.", { status: 503, headers: headers() });
  }
  const cookie = request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1) ?? "";
  const [expiry, tag] = cookie.split(".");
  const authenticated = Boolean(expiry && tag && /^\d+$/.test(expiry) && Number(expiry) > Date.now() && Number(expiry) <= Date.now() + SESSION_SECONDS * 1000 && await equalSecret(tag, await signature(expiry, config.sessionSecret)));
  const secure = url.protocol === "https:" ? "; Secure" : "";
  const attributes = `; Path=/; HttpOnly; SameSite=Strict${secure}`;
  if (endpoint) {
    if (request.method === "GET") return Response.json({ authed: authenticated }, { headers: headers() });
    if (!["POST", "DELETE"].includes(request.method)) return new Response(null, { status: 405, headers: { ...headers(), Allow: "GET, POST, DELETE" } });
    if (request.headers.get("origin") !== url.origin) return new Response("Forbidden", { status: 403, headers: headers() });
    if (request.method === "DELETE") return Response.json({ ok: true }, { headers: { ...headers(), "Set-Cookie": `${COOKIE}=; Max-Age=0${attributes}` } });
    let email = "", password = "";
    try {
      if (request.headers.get("content-type")?.includes("application/json")) {
        const body = await request.json();
        email = typeof body.email === "string" ? body.email : "";
        password = typeof body.password === "string" ? body.password : "";
      } else {
        const form = await request.formData();
        email = String(form.get("email") ?? ""); password = String(form.get("password") ?? "");
      }
    } catch { return new Response("Invalid request", { status: 400, headers: headers() }); }
    const ok = email.length <= 320 && password.length <= 1024 && await equalSecret(email.trim().toLowerCase(), config.email.toLowerCase()) && await equalSecret(password, config.password);
    if (!ok) return request.headers.get("accept")?.includes("application/json")
      ? Response.json({ ok: false, error: "Identifiants invalides / Invalid credentials" }, { status: 401, headers: headers() })
      : new Response(loginHtml(true), { status: 401, headers: { ...headers(), "Content-Type": "text/html; charset=utf-8" } });
    const payload = String(Date.now() + SESSION_SECONDS * 1000);
    const sessionHeaders = { ...headers(), "Set-Cookie": `${COOKIE}=${payload}.${await signature(payload, config.sessionSecret)}; Max-Age=${SESSION_SECONDS}${attributes}` };
    return request.headers.get("accept")?.includes("application/json") ? Response.json({ ok: true }, { headers: sessionHeaders }) : new Response(null, { status: 303, headers: { ...sessionHeaders, Location: "/" } });
  }
  if (authenticated) return null;
  if ((request.method === "GET" || request.method === "HEAD") && request.headers.get("accept")?.includes("text/html")) {
    return new Response(request.method === "HEAD" ? null : loginHtml(false), { status: 401, headers: { ...headers(), "Content-Type": "text/html; charset=utf-8", "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'self'" } });
  }
  return new Response("Unauthorized", { status: 401, headers: headers() });
}

function loginHtml(error: boolean) {
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SIGHT HUB — Accès confidentiel</title><style>:root{--background:#fafaf7;--foreground:#172522;--primary:#0f766e;--border:#b4bdb8;--destructive:#a12424}*{box-sizing:border-box}body{margin:0;background:var(--background);color:var(--foreground);font-family:system-ui,sans-serif;min-height:100vh;display:grid;place-items:center;padding:24px}main{width:100%;max-width:420px}h1{font-family:Georgia,serif;font-size:48px;font-weight:400;margin:12px 0}p{line-height:1.6}label{display:block;margin-top:24px;font-size:14px}input{width:100%;font:inherit;padding:12px 0;border:0;border-bottom:1px solid var(--border);background:transparent}button{width:100%;margin-top:28px;padding:16px;border:0;background:var(--primary);color:var(--background);font:inherit;cursor:pointer}.error{color:var(--destructive)}</style></head><body><main><p>Accès confidentiel · Confidential access</p><h1>SIGHT HUB</h1><form method="post" action="/api/site-session"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="username" required><label for="password">Mot de passe / Password</label><input id="password" name="password" type="password" autocomplete="current-password" required>${error ? '<p class="error" role="alert">Identifiants invalides / Invalid credentials</p>' : ''}<button type="submit">Se connecter / Sign in →</button></form></main></body></html>`;
}