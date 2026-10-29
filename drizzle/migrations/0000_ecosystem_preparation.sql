CREATE TABLE public.ecosystem_preparation (
 site_url text PRIMARY KEY,
 owner text NOT NULL DEFAULT '',
 steps jsonb NOT NULL DEFAULT '[]'::jsonb,
 updated_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT known_ecosystem_site CHECK (site_url IN ('https://lore.sightnetwork.org/', 'https://signal.sightnetwork.org/', 'https://coreapp.sightnetwork.org/', 'https://family.sightnetwork.org/', 'https://www.core.sightnetwork.org/')),
 CONSTRAINT owner_length CHECK (length(owner) <= 120)
);
GRANT ALL ON public.ecosystem_preparation TO service_role;
REVOKE ALL ON public.ecosystem_preparation FROM anon, authenticated;
ALTER TABLE public.ecosystem_preparation ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.ecosystem_preparation IS 'Confidential internal preparation tracking; only server functions authorized by the signed site session may access it. No direct browser access.';