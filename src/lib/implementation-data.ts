// Bilingual implementation dossier — read-only page (not downloadable).
// Each string is { fr, en }.

export type L = { fr: string; en: string };
const b = (fr: string, en: string): L => ({ fr, en });

export const IMPL_INTRO = {
  eyebrow: b("Annexe · Mise en place", "Annex · Implementation"),
  title: b("Fichier de mise en place des produits.", "Product implementation file."),
  lead: b(
    "Stacks visés, cahiers des charges par étape de réalisation, et relations de dépendance entre produits. Document de lecture interne — il n'est pas téléchargeable.",
    "Target stacks, specifications for each build stage, and dependency relations between products. Internal read-only document — not downloadable.",
  ),
};

// 1 — Target stack, layer by layer
export const STACK_LAYERS: {
  layer: L;
  target: L;
  why: L;
  items: string[];
}[] = [
  {
    layer: b("Socle applicatif", "Application core"),
    target: b("TypeScript de bout en bout", "End-to-end TypeScript"),
    why: b(
      "Une seule langue pour le web, le mobile et les APIs : mobilité des ingénieurs entre les filiales, une seule chaîne de revue.",
      "One language across web, mobile and APIs: engineers move between subsidiaries, one review chain.",
    ),
    items: ["React + TanStack (web)", "React Native / Expo (mobile)", "Node/TS + Fastify (services)", "Zod (contrats de données)"],
  },
  {
    layer: b("Données", "Data"),
    target: b("PostgreSQL comme vérité unique", "PostgreSQL as single source of truth"),
    why: b(
      "Transactions ACID obligatoires pour PAY et ID ; extensions plutôt que nouveaux moteurs.",
      "ACID transactions are mandatory for PAY and ID; extensions rather than new engines.",
    ),
    items: ["Postgres 16 + RLS", "Redis (files, sessions, taux)", "ClickHouse (SIGHT DATA, à partir de 2028)", "S3-compatible (objets, archives)"],
  },
  {
    layer: b("Paiements & Bitcoin", "Payments & Bitcoin"),
    target: b("Rails hybrides : mobile money + Lightning", "Hybrid rails: mobile money + Lightning"),
    why: b(
      "Le mobile money apporte le volume, Bitcoin apporte le règlement transfrontalier sans correspondant bancaire.",
      "Mobile money brings volume, Bitcoin brings cross-border settlement without a correspondent bank.",
    ),
    items: ["Connecteurs MNO (Lumicash, Ecocash, EcoKash)", "Lightning (LND) + garde partagée", "Moteur de risque & limites", "Grand livre en double entrée"],
  },
  {
    layer: b("Identité", "Identity"),
    target: b("OIDC interne opéré par SIGHT ID", "In-house OIDC operated by SIGHT ID"),
    why: b(
      "Le KYC doit être réutilisable : vérifié une fois chez My Satoshis, valable pour PAY, MARKET, GOV.",
      "KYC must be reusable: verified once on My Satoshis, valid for PAY, MARKET, GOV.",
    ),
    items: ["OIDC / OAuth2 + jetons courts", "Pipeline KYC (document, selfie, revue humaine)", "Journal d'audit inaltérable", "SDK client unique pour le groupe"],
  },
  {
    layer: b("Infrastructure", "Infrastructure"),
    target: b("Location jusqu'en 2029, souveraineté ensuite", "Rent until 2029, sovereignty afterwards"),
    why: b(
      "Acheter du matériel avant d'avoir la charge est la façon la plus rapide de brûler la trésorerie.",
      "Buying hardware before having the load is the fastest way to burn cash.",
    ),
    items: ["Conteneurs + Kubernetes managé (2027–2028)", "SIGHT CLOUD régions Bujumbura/Kigali (2029)", "GPU loués puis possédés (SIGHT COMPUTE, 2031)", "IaC : Terraform + GitOps"],
  },
  {
    layer: b("Sécurité & conformité", "Security & compliance"),
    target: b("Contrôles avant croissance", "Controls before growth"),
    why: b(
      "Aucun contrat bancaire ni public ne se signe sans traçabilité et SOC démontrables.",
      "No bank or public contract is signed without demonstrable traceability and a SOC.",
    ),
    items: ["Secrets gérés + rotation", "Chiffrement au repos et en transit", "SOC interne (SIGHT SECURITY, 2028)", "Trace AML/CFT complète"],
  },
  {
    layer: b("Observabilité & livraison", "Observability & delivery"),
    target: b("Une seule chaîne de livraison pour toutes les filiales", "One delivery chain for all subsidiaries"),
    why: b(
      "Quinze entités ne peuvent pas inventer quinze façons de déployer.",
      "Fifteen entities cannot invent fifteen ways to deploy.",
    ),
    items: ["CI/CD partagé + revues obligatoires", "Traces/metrics/logs centralisés", "Astreinte et post-mortem écrits", "Environnements : dev → staging → prod"],
  },
];

// 2 — Specifications per build stage
export const STAGE_SPECS: {
  code: string;
  period: L;
  name: L;
  scope: L;
  deliverables: L[];
  exit: L;
}[] = [
  {
    code: "S0",
    period: b("2026 — année de préparation (hors agenda)", "2026 — preparation year (outside the agenda)"),
    name: b("Cadrage & fondations", "Framing & foundations"),
    scope: b(
      "Rien n'est lancé commercialement. On écrit, on structure, on recrute le noyau.",
      "Nothing launches commercially. We write, we structure, we hire the core.",
    ),
    deliverables: [
      b("Structure juridique du groupe et des deux premières filiales", "Legal structure of the group and the first two subsidiaries"),
      b("Architecture cible validée (schémas, contrats d'API, modèle de données)", "Approved target architecture (diagrams, API contracts, data model)"),
      b("Noyau d'ingénierie recruté (8 à 10 personnes)", "Engineering core hired (8 to 10 people)"),
      b("Dossiers réglementaires déposés (paiement, données)", "Regulatory filings submitted (payments, data)"),
    ],
    exit: b("Aucune ligne de production écrite sans architecture signée.", "No production line written without a signed architecture."),
  },
  {
    code: "S1",
    period: b("2027 — lancement", "2027 — launch"),
    name: b("Rails de base : ID + PAY", "Base rails: ID + PAY"),
    scope: b(
      "SIGHT ID et SIGHT PAY entrent en service sur la base existante de My Satoshis. SIGHT ACADEMY ouvre pour alimenter le recrutement.",
      "SIGHT ID and SIGHT PAY go live on the existing My Satoshis base. SIGHT ACADEMY opens to feed hiring.",
    ),
    deliverables: [
      b("KYC réutilisable en production, une identité pour tous les produits", "Reusable KYC in production, one identity across all products"),
      b("Acquisition marchande : SDK, terminal web, réconciliation quotidienne", "Merchant acquiring: SDK, web terminal, daily reconciliation"),
      b("Grand livre en double entrée et clôture comptable automatisée", "Double-entry ledger and automated accounting close"),
      b("Première cohorte ACADEMY (60 apprenants, 15 embauches internes)", "First ACADEMY cohort (60 learners, 15 internal hires)"),
    ],
    exit: b("1 000 marchands actifs et réconciliation à 99,9 % avant toute nouvelle filiale.", "1,000 active merchants and 99.9% reconciliation before any new subsidiary."),
  },
  {
    code: "S2",
    period: b("2028 — protection & lisibilité", "2028 — protection & readability"),
    name: b("SECURITY, DATA, MEDIA", "SECURITY, DATA, MEDIA"),
    scope: b(
      "Le volume existe : il faut le protéger, le mesurer et le raconter.",
      "Volume exists: it must be protected, measured and narrated.",
    ),
    deliverables: [
      b("SOC opérationnel 16h/24, détection et réponse documentées", "SOC operating 16/7, documented detection and response"),
      b("Entrepôt de données groupe + premiers tableaux de bord vendus", "Group data warehouse + first commercial dashboards"),
      b("AFJ industrialisé en holding média (rythme éditorial hebdomadaire)", "AFJ industrialised into a media holding (weekly editorial cadence)"),
    ],
    exit: b("Audit de sécurité externe passé — condition d'accès au secteur public.", "External security audit passed — the gate to public-sector access."),
  },
  {
    code: "S3",
    period: b("2029 — souveraineté", "2029 — sovereignty"),
    name: b("CLOUD, GOV, FOUNDATION", "CLOUD, GOV, FOUNDATION"),
    scope: b(
      "Hébergement local d'abord, plateforme civique ensuite, légitimité en parallèle.",
      "Local hosting first, civic platform next, legitimacy in parallel.",
    ),
    deliverables: [
      b("Première région cloud souveraine en production (Bujumbura)", "First sovereign cloud region in production (Bujumbura)"),
      b("Socle GOV en marque blanche : portail, paiement, registre", "White-label GOV stack: portal, payment, registry"),
      b("Fondation active : open-source, bourses, tech civique", "Active foundation: open source, scholarships, civic tech"),
    ],
    exit: b("Une administration en production sur GOV avec résidence locale des données.", "One public administration live on GOV with local data residency."),
  },
  {
    code: "S4",
    period: b("2030–2031 — extension", "2030–2031 — extension"),
    name: b("LABS, CAPITAL, MARKET, COMPUTE", "LABS, CAPITAL, MARKET, COMPUTE"),
    scope: b(
      "La trésorerie autorise la R&D, l'investissement, le commerce et le calcul possédé.",
      "Cash flow allows R&D, investment, commerce and owned compute.",
    ),
    deliverables: [
      b("LABS : 3 chantiers financés (cryptographie, IA, tech civique)", "LABS: 3 funded programmes (cryptography, AI, civic tech)"),
      b("CAPITAL : premier véhicule d'investissement et pipeline de M&A", "CAPITAL: first investment vehicle and M&A pipeline"),
      b("MARKET : catalogue, paiement et transfert logistique pour PME", "MARKET: catalog, checkout and logistics handoff for SMEs"),
      b("COMPUTE : premier parc GPU en propre adossé à la demande Yepo", "COMPUTE: first owned GPU fleet backed by Yepo demand"),
    ],
    exit: b("Taux d'utilisation GPU > 60 % avant tout achat supplémentaire.", "GPU utilisation above 60% before any further purchase."),
  },
  {
    code: "S5",
    period: b("2032 — secteurs régulés", "2032 — regulated sectors"),
    name: b("AGRI, HEALTH", "AGRI, HEALTH"),
    scope: b(
      "Les deux verticales les plus exigeantes, lancées en dernier sur des fondations matures.",
      "The two most demanding verticals, launched last on mature foundations.",
    ),
    deliverables: [
      b("AGRI : scoring des exploitations, crédit intrants, données satellitaires", "AGRI: farm scoring, input credit, satellite data"),
      b("HEALTH : dossier patient interopérable, hébergement certifié", "HEALTH: interoperable patient record, certified hosting"),
    ],
    exit: b("Conformité sectorielle obtenue avant le premier utilisateur réel.", "Sector compliance obtained before the first real user."),
  },
];

// 3 — Relations between entities
export const RELATIONS: { code: string; needs: string[]; serves: string[]; note: L }[] = [
  { code: "MY SATOSHIS", needs: ["SIGHT ID", "SIGHT PAY"], serves: ["SIGHT PAY", "SIGHT MARKET"], note: b("Fournit la base d'utilisateurs et la liquidité initiale.", "Provides the initial user base and liquidity.") },
  { code: "LEARN BTC", needs: [], serves: ["SIGHT ACADEMY", "MY SATOSHIS"], note: b("Canal d'acquisition et vivier de recrutement.", "Acquisition channel and hiring pool.") },
  { code: "AFJ", needs: [], serves: ["SIGHT MEDIA"], note: b("Crédibilité institutionnelle avant chaque lancement.", "Institutional credibility ahead of each launch.") },
  { code: "YEPO", needs: ["SIGHT DATA", "SIGHT COMPUTE"], serves: ["SIGHT COMPUTE", "SIGHT LABS"], note: b("Première charge IA justifiant le calcul possédé.", "First AI workload justifying owned compute.") },
  { code: "SIGHT ID", needs: [], serves: ["Tout le groupe", "Tiers (banques, MNO)"], note: b("Dépendance racine : rien ne se lance avant elle.", "Root dependency: nothing launches before it.") },
  { code: "SIGHT PAY", needs: ["SIGHT ID"], serves: ["MY SATOSHIS", "SIGHT MARKET", "SIGHT GOV", "SIGHT AGRI"], note: b("Encaissement de tout le groupe.", "Collection layer for the whole group.") },
  { code: "SIGHT ACADEMY", needs: ["LEARN BTC"], serves: ["Toutes les filiales"], note: b("Alimente le recrutement de chaque étape.", "Feeds hiring at every stage.") },
  { code: "SIGHT SECURITY", needs: ["SIGHT ID", "SIGHT PAY"], serves: ["Toutes les filiales", "Banques, secteur public"], note: b("Condition d'accès aux contrats régulés.", "Gate to regulated contracts.") },
  { code: "SIGHT DATA", needs: ["SIGHT PAY", "SIGHT ID"], serves: ["YEPO", "SIGHT AGRI", "SIGHT CAPITAL"], note: b("Sans volume transactionnel, aucun produit data.", "Without transaction volume there is no data product.") },
  { code: "SIGHT MEDIA", needs: ["AFJ"], serves: ["Tout le groupe"], note: b("Distribution et narration.", "Distribution and narrative.") },
  { code: "SIGHT CLOUD", needs: ["SIGHT SECURITY"], serves: ["SIGHT GOV", "SIGHT HEALTH", "SIGHT COMPUTE"], note: b("Résidence des données, préalable au public.", "Data residency, a prerequisite for public sector.") },
  { code: "SIGHT GOV", needs: ["SIGHT CLOUD", "SIGHT ID", "SIGHT PAY"], serves: ["Administrations"], note: b("Assemble trois briques existantes, n'en crée aucune.", "Assembles three existing bricks, creates none.") },
  { code: "SIGHT FOUNDATION", needs: [], serves: ["Licence sociale du groupe"], note: b("Protège la légitimité à mesure que le groupe devient visible.", "Protects legitimacy as the group becomes visible.") },
  { code: "SIGHT LABS", needs: ["SIGHT DATA", "SIGHT COMPUTE"], serves: ["Toutes les filiales"], note: b("R&D financée par la trésorerie du cœur.", "R&D funded by core cash flow.") },
  { code: "SIGHT CAPITAL", needs: ["SIGHT DATA"], serves: ["Écosystème externe"], note: b("Étend l'écosystème sans le construire soi-même.", "Extends the ecosystem without building it in-house.") },
  { code: "SIGHT MARKET", needs: ["SIGHT PAY", "SIGHT ID"], serves: ["PME, marchands"], note: b("Couche commerce sur des rails déjà payés.", "Commerce layer on rails already paid for.") },
  { code: "SIGHT COMPUTE", needs: ["SIGHT CLOUD", "YEPO"], serves: ["YEPO", "SIGHT LABS", "Tiers IA"], note: b("Ne s'achète qu'avec une demande prouvée.", "Only purchased against proven demand.") },
  { code: "SIGHT AGRI", needs: ["SIGHT DATA", "SIGHT PAY", "SIGHT COMPUTE"], serves: ["Coopératives, financeurs"], note: b("Trois dépendances : dernier bloc réaliste.", "Three dependencies: realistically a late block.") },
  { code: "SIGHT HEALTH", needs: ["SIGHT ID", "SIGHT CLOUD", "SIGHT SECURITY"], serves: ["Hôpitaux, assureurs"], note: b("Barre réglementaire la plus haute du groupe.", "Highest regulatory bar in the group.") },
];

// 4 — Non-negotiable rules
export const IMPL_RULES: L[] = [
  b("Aucune filiale ne démarre avant que ses dépendances soient en production.", "No subsidiary starts before its dependencies are in production."),
  b("Un seul dépôt de contrats d'API : toute intégration passe par un contrat versionné.", "A single API-contract repository: every integration goes through a versioned contract."),
  b("Deux à trois lancements par an au maximum, quelle que soit la trésorerie.", "Two to three launches per year maximum, whatever the cash position."),
  b("Louer avant d'acheter : matériel et capacité s'achètent sur usage prouvé.", "Rent before buying: hardware and capacity are bought against proven usage."),
  b("Chaque étape se ferme sur un critère de sortie mesurable, pas sur une date.", "Each stage closes on a measurable exit criterion, not on a date."),
];
