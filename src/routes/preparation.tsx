import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Save, ArrowUpRight } from "lucide-react";
import { SiteShell, PageHeader, Section } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLang } from "@/lib/i18n";
import { ECOSYSTEM_SITES } from "@/lib/ecosystem-sites";
import { STAGES, STATUS, emptyPreparation, isOverdue, preparationSchema, type Preparation } from "@/lib/preparation";
import { loadPreparation, savePreparation } from "@/lib/preparation.functions";

const preparationQuery = queryOptions({ queryKey: ["ecosystem-preparation"], queryFn: () => loadPreparation() });
export const Route = createFileRoute("/preparation")({
  loader: ({ context }) => context.queryClient.ensureQueryData(preparationQuery),
  head: () => ({ meta: [
    { title: "Préparation commerciale — SIGHT HUB" },
    { name: "description", content: "Suivi interne des responsables, étapes et échéances des cinq sites avant janvier 2027." },
    { property: "og:title", content: "Préparation commerciale — SIGHT HUB" },
    { property: "og:description", content: "Tableau de bord confidentiel de préparation commerciale de l’écosystème SIGHT." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Page,
  errorComponent: ({ reset }) => <SiteShell><Section><p role="alert">Suivi indisponible / Tracking unavailable</p><Button onClick={reset}>Réessayer / Retry</Button></Section></SiteShell>,
});

function Page() {
  const { lang } = useLang();
  const fr = lang === "fr";
  const { data } = useSuspenseQuery(preparationQuery);
  const [filter, setFilter] = useState("all");
  const [today, setToday] = useState("");
  useEffect(() => { setToday(new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Bujumbura", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date())); }, []);
  const records = ECOSYSTEM_SITES.map((site) => data.find((r) => r.site_url === site.url) ?? emptyPreparation(site.url));
  const allSteps = records.flatMap((r) => r.steps);
  const done = allSteps.filter((s) => s.status === "done").length;
  const stats = [
    [fr ? "Étapes terminées" : "Completed steps", `${done} / ${allSteps.length}`],
    [fr ? "Sites avec responsable" : "Sites with owner", `${records.filter((r) => r.owner).length} / 5`],
    [fr ? "Étapes bloquées" : "Blocked steps", allSteps.filter((s) => s.status === "blocked").length],
    [fr ? "Échéances dépassées" : "Overdue deadlines", today ? allSteps.filter((s) => isOverdue(s, today)).length : "—"],
  ];
  return <SiteShell>
    <PageHeader eyebrow={fr ? "Interne · Préparation 2026" : "Internal · 2026 preparation"} title={fr ? "Préparation commerciale" : "Commercial preparation"} lead={fr ? "Commercialisation : 1er janvier 2027. Responsables à désigner ; étapes et dates proposées à valider." : "Commercialization: January 1, 2027. Owners to assign; proposed steps and dates to validate."} />
    <Section className="rule-line">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">{stats.map(([label, value]) => <div key={label} className="border-l border-border pl-4"><p className="text-sm text-muted-foreground">{label}</p><p className="text-3xl font-display mt-2">{value}</p></div>)}</div>
      <div className="flex flex-wrap justify-between items-center gap-4 mt-8">
        <Select value={filter} onValueChange={setFilter}><SelectTrigger className="w-full sm:w-72" aria-label={fr ? "Filtrer les sites" : "Filter sites"}><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">{fr ? "Tous les sites" : "All sites"}</SelectItem>{ECOSYSTEM_SITES.map((site) => <SelectItem key={site.url} value={site.url}>{site.name} · {site.kind === "website" ? (fr ? "Site web" : "Website") : new URL(site.url).hostname.split(".")[0]}</SelectItem>)}</SelectContent></Select>
        <Button asChild variant="ghost"><Link to="/ecosystem">{fr ? "Écosystème" : "Ecosystem"}<ArrowUpRight /></Link></Button>
      </div>
    </Section>
    {ECOSYSTEM_SITES.filter((site) => filter === "all" || filter === site.url).map((site) => <SiteEditor key={site.url} site={site} initial={data.find((r) => r.site_url === site.url) ?? emptyPreparation(site.url)} today={today} fr={fr} />)}
  </SiteShell>;
}

function SiteEditor({ site, initial, today, fr }: { site: typeof ECOSYSTEM_SITES[number]; initial: Preparation; today: string; fr: boolean }) {
  const [draft, setDraft] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [dirty, setDirty] = useState(false);
  const save = useServerFn(savePreparation);
  const queryClient = useQueryClient();
  const labels = fr ? { todo: "À faire", doing: "En cours", blocked: "Bloqué", done: "Terminé" } : { todo: "To do", doing: "In progress", blocked: "Blocked", done: "Done" };
  function editStep(index: number, change: Partial<Preparation["steps"][number]>) {
    setDraft((d) => ({ ...d, steps: d.steps.map((s, i) => i === index ? { ...s, ...change } : s) })); setDirty(true); setMessage("");
  }
  async function submit() {
    const parsed = preparationSchema.safeParse(draft);
    if (!parsed.success) { setMessage(fr ? "Vérifiez les champs et les dates : échéances en 2026 uniquement." : "Check fields and dates: deadlines must be in 2026."); return; }
    setBusy(true);
    try { await save({ data: parsed.data }); await queryClient.invalidateQueries({ queryKey: preparationQuery.queryKey }); setDirty(false); setMessage(fr ? "Enregistré" : "Saved"); }
    catch { setMessage(fr ? "Enregistrement impossible. Vos modifications sont conservées à l’écran." : "Save failed. Your edits remain on screen."); }
    finally { setBusy(false); }
  }
  const completed = draft.steps.filter((s) => s.status === "done").length;
  return <Section className="rule-line">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div><h2 className="font-display text-3xl">{site.name}{site.kind && <span className="text-lg text-muted-foreground"> · {site.kind === "website" ? (fr ? "Site web" : "Website") : "Application"}</span>}</h2><a className="text-sm text-primary break-all inline-flex items-center gap-1 mt-2" href={site.url} target="_blank" rel="noopener noreferrer">{new URL(site.url).hostname}<ArrowUpRight className="size-4" /></a></div>
      <p className="font-mono text-sm">{completed} / 6 · {Math.round(completed / 6 * 100)} %</p>
    </div>
    <label className="block mt-6 max-w-md text-sm">{fr ? "Responsable du site" : "Site owner"}<Input className="mt-2" aria-label={`${fr ? "Responsable du site" : "Site owner"} ${new URL(site.url).hostname}`} value={draft.owner} maxLength={120} disabled={busy} placeholder={fr ? "À désigner" : "To assign"} onChange={(e) => { setDraft({ ...draft, owner: e.target.value }); setDirty(true); setMessage(""); }} /></label>
    <div className="mt-6 divide-y divide-border">
      {draft.steps.map((step, index) => {
        const stage = STAGES.find((s) => s.id === step.id);
        const label = stage ? (fr ? stage.fr : stage.en) : step.id;
        return <div key={step.id} className="grid lg:grid-cols-[1.1fr_1fr_160px_160px] gap-4 py-5">
          <div><h3 className="font-medium">{label}</h3>{today && isOverdue(step, today) && <p className="text-destructive text-sm mt-1">{fr ? "Échéance dépassée" : "Overdue"}</p>}</div>
          <label className="text-xs text-muted-foreground">{fr ? "Responsable de l’étape" : "Step owner"}<Input className="mt-1" value={step.owner} maxLength={120} disabled={busy} placeholder={draft.owner || (fr ? "À désigner" : "To assign")} onChange={(e) => editStep(index, { owner: e.target.value })} /></label>
          <label className="text-xs text-muted-foreground">{fr ? "Échéance" : "Deadline"}<Input className="mt-1" type="date" min="2026-01-01" max="2026-12-31" value={step.deadline} disabled={busy} onChange={(e) => editStep(index, { deadline: e.target.value })} /></label>
          <div className="text-xs text-muted-foreground">{fr ? "Statut" : "Status"}<Select value={step.status} disabled={busy} onValueChange={(value) => { const status = STATUS.find((s) => s === value); if (status) editStep(index, { status }); }}><SelectTrigger className="mt-1" aria-label={`${fr ? "Statut" : "Status"} ${label}`}><SelectValue /></SelectTrigger><SelectContent>{STATUS.map((s) => <SelectItem key={s} value={s}>{labels[s]}</SelectItem>)}</SelectContent></Select></div>
          <label className="lg:col-start-2 lg:col-span-3 text-xs text-muted-foreground">{fr ? "Notes / blocages" : "Notes / blockers"}<Input className="mt-1" value={step.notes} maxLength={2000} disabled={busy} onChange={(e) => editStep(index, { notes: e.target.value })} /></label>
        </div>;
      })}
    </div>
    <div className="flex flex-wrap items-center gap-4 mt-4"><Button disabled={busy || !dirty} onClick={submit}><Save />{busy ? (fr ? "Enregistrement…" : "Saving…") : (fr ? "Enregistrer" : "Save")}</Button><p className="text-sm text-muted-foreground" role="status">{message || (dirty ? (fr ? "Modifications non enregistrées" : "Unsaved changes") : "")}</p></div>
  </Section>;
}