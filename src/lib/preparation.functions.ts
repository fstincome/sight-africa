import { createServerFn } from "@tanstack/react-start";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";
import { handleSiteAccess } from "./site-access";
import { preparationSchema } from "./preparation";

export const loadPreparation = createServerFn({ method: "GET" }).handler(async () => {
  const denied = await handleSiteAccess(getRequest(), {
    email: process.env.SITE_EMAIL, password: process.env.SITE_PASSWORD, sessionSecret: process.env.SESSION_SECRET,
  });
  if (denied) throw new Error("Accès confidentiel / Confidential access");
  setResponseHeader("Cache-Control", "private, no-store");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("ecosystem_preparation").select("site_url, owner, steps, updated_at");
  if (error) throw new Error("Chargement indisponible / Loading unavailable");
  return (data ?? []).map((row) => ({ ...preparationSchema.parse(row), updated_at: row.updated_at }));
});

export const savePreparation = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => preparationSchema.parse(input))
  .handler(async ({ data }) => {
    const request = getRequest();
    const denied = await handleSiteAccess(request, {
      email: process.env.SITE_EMAIL, password: process.env.SITE_PASSWORD, sessionSecret: process.env.SESSION_SECRET,
    });
    if (denied || request.headers.get("origin") !== new URL(request.url).origin) throw new Error("Accès refusé / Access denied");
    setResponseHeader("Cache-Control", "private, no-store");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("ecosystem_preparation").upsert({ ...data, updated_at: new Date().toISOString() });
    if (error) throw new Error("Enregistrement indisponible / Save unavailable");
    return { ok: true };
  });