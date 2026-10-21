# SIGHT HUB on Vercel

## Deployment
1. Export/sync this project to a **private** GitHub repository and import it into Vercel.
2. Keep the committed `vercel.json`: build `bun run build`, install `bun install --frozen-lockfile`, Nitro output `.vercel/output`. Do not select Next.js or a static-only Vite deployment.
3. In Vercel → Project → Settings → Environment Variables, set server-only variables for Production and Preview:
   - `SITE_EMAIL`: the authorized reader's email.
   - `SITE_PASSWORD`: a new strong password. The previous password appeared in source/chat and should be replaced.
   - `SESSION_SECRET`: a cryptographically random string of at least 32 characters (64 recommended). Generate it with your password manager, not a memorable password.
   Secrets stored in Lovable **do not automatically transfer** to Vercel. Never prefix these with `VITE_` or commit them.
4. Deploy. Missing settings intentionally return HTTP 503 instead of exposing the platform.

## Custom domain
1. Add `hub.sightnetwork.org` in Vercel → Project → Settings → Domains.
2. In Cloudflare → sightnetwork.org → DNS, add the **exact** record Vercel displays for `hub` (normally CNAME). Do not copy a guessed target.
3. Use DNS-only while verification and HTTPS issuance complete; keep email and other hostnames unchanged.
4. In Cloudflare, do not apply Cache Everything to this hostname. Keep Vercel's private/no-store responses uncached.
5. Test HTTPS, sign-in, refresh, PDF preview, direct download, logout, and an incognito direct PDF URL. The last must return 401.

## Security boundaries
- Vercel root `middleware.ts` matches **every** request, before static files and SSR. Signed-out visitors receive no JavaScript strategy data or confidential documents.
- The server entry also checks requests; login compares hashed secrets and sessions use HMAC-signed HttpOnly, Secure, SameSite cookies lasting 12 hours.
- This is a single-reader site gate, not multi-user account management. Logging out clears this browser's cookie; changing `SESSION_SECRET` revokes all issued cookies.
- Files downloaded by an authorized reader cannot be recalled. Protect your private repository, Vercel account and device.
- No offline document caching is implemented. Installation still requires internet access and a valid session.
- The Lovable server-entry check does **not** protect files served directly by Lovable's static hosting. Confidentiality of all assets relies on Vercel Routing Middleware for this deployment; do not assume the currently published Lovable URL is equally protected.

## Verification status
Local unit tests cover missing secrets, bad credentials, forged sessions, cross-origin login, cookie flags and PDF/Word/JavaScript request blocking. The Vercel deployment and Cloudflare DNS require a live post-deploy verification; local preview cannot prove Vercel's middleware routing.