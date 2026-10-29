// Public addresses confirmed by SIGHT AFRICA; availability is distinct from commercialization.
export const ECOSYSTEM_SITES = [
  { name: "SIGHT LORE", url: "https://lore.sightnetwork.org/" },
  { name: "SIGHT SIGNAL", url: "https://signal.sightnetwork.org/" },
  { name: "SIGHT CORE", url: "https://coreapp.sightnetwork.org/", kind: "application" },
  { name: "SIGHT FAMILY", url: "https://family.sightnetwork.org/" },
  { name: "SIGHT CORE", url: "https://www.core.sightnetwork.org/", kind: "website" },
].map((site) => ({ ...site, available: true, commercializationDate: "2027-01-01" }));