import { z } from "zod";
import { ECOSYSTEM_SITES } from "./ecosystem-sites";

export const STAGES = [
  { id: "offer", fr: "Offre et tarifs", en: "Offer and pricing", date: "2026-11-13" },
  { id: "legal", fr: "Conditions et conformité", en: "Terms and compliance", date: "2026-11-27" },
  { id: "payments", fr: "Paiements et facturation", en: "Payments and billing", date: "2026-12-04" },
  { id: "pilot", fr: "Tests et clients pilotes", en: "Testing and pilot customers", date: "2026-12-11" },
  { id: "support", fr: "Support et communication", en: "Support and communication", date: "2026-12-18" },
  { id: "approval", fr: "Validation finale", en: "Final approval", date: "2026-12-30" },
] as const;
export const STATUS = ["todo", "doing", "blocked", "done"] as const;
export const stepSchema = z.object({
  id: z.enum(["offer", "legal", "payments", "pilot", "support", "approval"]),
  owner: z.string().trim().max(120),
  deadline: z.string().regex(/^2026-\d{2}-\d{2}$/).refine((v) => {
    const date = new Date(v + "T00:00:00Z");
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === v && v < "2027-01-01";
  }, "Échéance valide avant janvier 2027 requise / Valid deadline before January 2027 required"),
  status: z.enum(STATUS),
  notes: z.string().trim().max(2000),
});
export const preparationSchema = z.object({
  site_url: z.string().refine((url) => ECOSYSTEM_SITES.some((s) => s.url === url)),
  owner: z.string().trim().max(120),
  steps: z.array(stepSchema).length(6).refine((steps) => new Set(steps.map((s) => s.id)).size === 6),
});
export type Preparation = z.infer<typeof preparationSchema>;
export function emptyPreparation(site_url: string): Preparation {
  return { site_url, owner: "", steps: STAGES.map((s) => ({ id: s.id, owner: "", deadline: s.date, status: "todo", notes: "" })) };
}
export function isOverdue(step: Preparation["steps"][number], today: string) {
  return step.status !== "done" && step.deadline < today;
}