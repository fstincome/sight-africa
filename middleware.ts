import { next } from "@vercel/functions";
import { handleSiteAccess } from "./src/lib/site-access";

// Vercel runs this before static files AND SSR: no bundle or document bypass.
export default async function middleware(request: Request) {
  const denied = await handleSiteAccess(request, {
    email: process.env.SITE_EMAIL,
    password: process.env.SITE_PASSWORD,
    sessionSecret: process.env.SESSION_SECRET,
  });
  if (denied) return denied;
  return next({ headers: { "Cache-Control": "private, no-store, max-age=0", "X-Robots-Tag": "noindex, nofollow" } });
}

export const config = { matcher: "/:path*" };