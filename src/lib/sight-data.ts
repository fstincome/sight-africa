// Strategic content for SIGHT AFRICA. Single source of truth.

export const SIGHT = {
  name: "SIGHT AFRICA",
  tagline: "Building the digital infrastructure of East Africa.",
  vision:
    "Become the leader in technology integration in Burundi by 2030 while promoting national digital sovereignty and contributing to Burundi Vision 2040–2060.",
  mission:
    "Provide advanced technologies, secure software solutions and local capacity building to accelerate digital transformation across Burundi and East Africa.",
  values: ["Integrity", "Innovation", "Sovereignty", "Excellence"],
};

export const NAV = [
  { to: "/", label: "Overview" },
  { to: "/vision-2035", label: "Vision 2035" },
  { to: "/roadmap", label: "Roadmap" },
  { to: "/products", label: "Products" },
  { to: "/future-products", label: "Future Build" },
  { to: "/organization", label: "Organization" },
  { to: "/phases", label: "Phases" },
  { to: "/financials", label: "Financials" },
  { to: "/playbook", label: "Playbook" },
  { to: "/ecosystem", label: "Ecosystem" },
] as const;

// PART 1 — End state 2035
export const END_STATE_2035 = {
  position:
    "The dominant digital infrastructure group of East Africa: the rails for payments, identity, cloud and AI across Burundi, Rwanda, DRC, Tanzania, Kenya, Uganda — with strategic footprints in Ethiopia and Zambia.",
  stats: [
    { k: "Active end-users", v: "32M+", note: "across consumer and merchant platforms" },
    { k: "Merchants on SIGHT PAY", v: "1.2M", note: "from kiosks to enterprises" },
    { k: "Annual revenue", v: "18 Mds FBU", note: "blended infrastructure + platform" },
    { k: "Employees", v: "4,800", note: "with 70% engineering & operations" },
    { k: "Countries operated", v: "9", note: "EAC + selected southern markets" },
    { k: "Data centers", v: "4", note: "sovereign cloud regions" },
    { k: "Bitcoin liquidity (regional)", v: "Top 3", note: "across East Africa" },
    { k: "Capital deployed via SIGHT CAPITAL", v: "3,5 Mds FBU", note: "into 90+ African startups" },
  ],
  influence: [
    "Designated national digital infrastructure partner of Burundi.",
    "Member of the EAC Digital Economy advisory council.",
    "Operator of the largest African-owned AI compute capacity outside South Africa and Nigeria.",
    "Reference education partner for fintech, AI and cybersecurity curricula in 5 universities.",
  ],
};

// PART 2 — Reverse-engineered roadmap
export const ROADMAP: Array<{
  year: number;
  theme: string;
  priorities: string[];
  releases: string[];
  revenue: string;
  team: string;
  infra: string[];
  partners: string[];
}> = [
  {
    year: 2026,
    theme: "Foundation & Brand",
    priorities: [
      "Consolidate the four existing products under one SIGHT AFRICA group identity",
      "Stabilize My Satoshis as a profitable BTC + mobile-money corridor",
      "Launch Africa Fintech Journal as a recognized regional publication",
    ],
    releases: ["My Satoshis 2.0 (merchant pilot)", "LEARN BTC certificate program v1", "AFJ weekly editorial"],
    revenue: "15M FBU ARR",
    team: "18 → 35",
    infra: ["Group brand system", "Single SSO across products", "Shared data platform v0"],
    partners: ["2 Burundian banks", "Regional MNOs", "Africa Bitcoin community"],
  },
  {
    year: 2027,
    theme: "Validation & Repeatability",
    priorities: [
      "Open Bujumbura HQ + first satellite office in Kigali",
      "Reach product-market fit on Yepo for African SMEs accessing AI",
      "Launch SIGHT ID pilot for KYC across group products",
    ],
    releases: ["Yepo Business", "SIGHT ID alpha", "AFJ research reports"],
    revenue: "60M FBU ARR",
    team: "35 → 80",
    infra: ["Group payments rails v1", "Internal compliance & risk function"],
    partners: ["Telco partnerships in Burundi & Rwanda", "2 regional fintech alliances"],
  },
  {
    year: 2028,
    theme: "Growth — Regional Footprint",
    priorities: [
      "Cross-border payments live (BI ↔ RW ↔ DRC)",
      "Launch SIGHT ACADEMY as standalone institution",
      "First sovereign cloud zone (SIGHT CLOUD Lake Tanganyika)",
    ],
    releases: ["SIGHT PAY v1", "SIGHT ACADEMY cohort 1", "SIGHT CLOUD region 1"],
    revenue: "220M FBU ARR",
    team: "80 → 220",
    infra: ["Tier-III data center partnership", "Regional NOC"],
    partners: ["Central banks (BRB, BNR)", "World Bank / AfDB digital programs"],
  },
  {
    year: 2029,
    theme: "Platformization",
    priorities: [
      "Open public APIs across PAY, ID, CLOUD",
      "Launch SIGHT CAPITAL fund I (450M FBU)",
      "Begin SIGHT LABS R&D center on applied AI and cryptography",
    ],
    releases: ["Developer portal", "SIGHT CAPITAL fund I", "SIGHT LABS"],
    revenue: "600M FBU ARR",
    team: "220 → 480",
    infra: ["API gateway", "Multi-tenant identity & permissions"],
    partners: ["3 universities", "International VCs as LPs"],
  },
  {
    year: 2030,
    theme: "Burundi 2030 Milestone",
    priorities: [
      "Become the de-facto digital integration partner for Burundian state services",
      "Hit 5M end-users across the group",
      "Launch SIGHT SECURITY as standalone subsidiary",
    ],
    releases: ["SIGHT SECURITY SOC", "Government services integration", "AFJ data & research division"],
    revenue: "1,5 Md FBU ARR",
    team: "480 → 900",
    infra: ["Second cloud region", "National cyber response capability"],
    partners: ["Government of Burundi", "EAC Secretariat"],
  },
  {
    year: 2031,
    theme: "Regional Expansion",
    priorities: [
      "Enter Tanzania, Kenya, Uganda commercially",
      "Launch SIGHT DATA — analytics & data infrastructure",
      "Series B equivalent: 1,2 Md FBU growth round",
    ],
    releases: ["SIGHT DATA", "Multi-currency PAY corridors", "Regional merchant network"],
    revenue: "3 Mds FBU ARR",
    team: "900 → 1,500",
    infra: ["Three operating countries", "Regional support & compliance org"],
    partners: ["Pan-African banks", "Visa / Mastercard regional"],
  },
  {
    year: 2032,
    theme: "Infrastructure Leadership",
    priorities: [
      "Position SIGHT CLOUD as preferred sovereign cloud for francophone Africa",
      "Launch SIGHT MARKET — cross-border digital commerce rails",
      "Establish governance & board for IPO-ready maturity",
    ],
    releases: ["SIGHT MARKET", "Sovereign cloud certification", "Independent board"],
    revenue: "5,5 Mds FBU ARR",
    team: "1,500 → 2,400",
    infra: ["Third data center", "Independent audit & risk framework"],
    partners: ["Francophone African governments", "Tier-1 global cloud reseller alliances"],
  },
  {
    year: 2033,
    theme: "AI & Compute Sovereignty",
    priorities: [
      "Stand up African-owned GPU compute via SIGHT LABS",
      "Yepo becomes the default AI access layer for African SMEs",
      "Cross-listing readiness (NSE / regional exchanges)",
    ],
    releases: ["SIGHT COMPUTE (GPU cloud)", "Yepo Enterprise", "Regulatory readiness pack"],
    revenue: "9 Mds FBU ARR",
    team: "2,400 → 3,400",
    infra: ["GPU clusters", "Carrier-neutral interconnects"],
    partners: ["NVIDIA / AMD reseller frameworks", "Universities & research"],
  },
  {
    year: 2034,
    theme: "Institutional Scale",
    priorities: [
      "Operate in 7 countries; revenue diversification across 4 segments",
      "SIGHT CAPITAL fund II (1,8 Md FBU)",
      "Mature M&A engine for adjacent assets",
    ],
    releases: ["Fund II", "First two acquisitions (paytech, edtech)", "Group ERP & financial backbone"],
    revenue: "13 Mds FBU ARR",
    team: "3,400 → 4,200",
    infra: ["Fourth data center", "Continental operations center"],
    partners: ["DFIs as long-term capital", "Regional sovereign funds"],
  },
  {
    year: 2035,
    theme: "Foundational Infrastructure",
    priorities: [
      "9 countries, 18 Mds FBU ARR, recognized critical infrastructure operator",
      "Public listing or strategic long-term capital partnership",
      "Established African-owned alternative across PAY · ID · CLOUD · DATA · SECURITY",
    ],
    releases: ["IPO / strategic listing", "20-year national infrastructure compact (BI)", "Pan-African API standard contributions"],
    revenue: "18 Mds FBU ARR",
    team: "4,200 → 4,800",
    infra: ["Resilient multi-region, multi-country backbone"],
    partners: ["EAC", "AU Digital Transformation Strategy"],
  },
];

// PART 3 — Product evolution
export const PRODUCTS = [
  {
    id: "mysatoshis",
    name: "MY SATOSHIS",
    color: "from-teal-500/10",
    summary: "Digital financial platform — Bitcoin exchange, mobile money, local payments.",
    stages: [
      {
        label: "Today",
        users: "Early adopters, BTC traders, Burundian diaspora",
        revenue: "Transaction fees, FX spread",
        features: ["BTC ↔ FBU/USD", "Mobile money rails", "Basic merchant payments"],
        market: "Burundi pioneer, first regulated-friendly BTC operator",
        risks: ["Regulatory ambiguity", "FX volatility", "Liquidity"],
        advantage: "First-mover, local trust, founder reputation",
        stack: ["Node/TS APIs", "Postgres", "Lightning + custodial wallets"],
        team: "10",
      },
      {
        label: "1 Year",
        users: "50k retail + 1k merchants",
        revenue: "30M FBU ARR",
        features: ["Merchant SDK", "Business accounts", "Compliance dashboard"],
        market: "Default BTC + mobile money on-ramp in Burundi",
        risks: ["Operational fraud", "Banking access"],
        advantage: "Embedded local distribution",
        stack: ["+ Risk engine", "+ KYC pipeline"],
        team: "25",
      },
      {
        label: "5 Years",
        users: "1M+ across EAC",
        revenue: "700M FBU ARR",
        features: ["Cross-border corridors", "Stablecoin treasury", "Embedded finance APIs"],
        market: "Tier-1 financial rail in francophone East Africa",
        risks: ["Sovereign regulation shifts", "Cyber threat surface"],
        advantage: "Owned rails, brand, capital, talent",
        stack: ["Event-driven core ledger", "ISO-20022 messaging", "HSM-backed custody"],
        team: "180",
      },
      {
        label: "10 Years",
        users: "8M end-users, 400k merchants",
        revenue: "4,5 Mds FBU ARR",
        features: ["Banking-as-a-Service for fintechs", "Treasury & FX desk", "BTC + stablecoin liquidity"],
        market: "Top-3 financial infrastructure operator in East Africa",
        risks: ["Geopolitics, capital controls"],
        advantage: "Network effect across merchants + BaaS partners",
        stack: ["Multi-region active-active core", "Real-time fraud ML"],
        team: "650",
      },
      {
        label: "Mature",
        users: "Foundational rail behind PAY · ID · MARKET",
        revenue: "Largest revenue contributor",
        features: ["Open developer APIs", "Programmable money", "Embedded BTC + CBDC support"],
        market: "Critical infrastructure",
        risks: ["Systemic — treated as regulated infrastructure"],
        advantage: "Hard-to-displace incumbent",
        stack: ["Sovereign cloud + multi-tenant ledger"],
        team: "Part of group operations",
      },
    ],
  },
  {
    id: "learnbtc",
    name: "LEARN BTC",
    color: "from-amber-500/10",
    summary: "Bitcoin & digital economy education — community, meetups, programs.",
    stages: [
      { label: "Today", users: "Community of ~500 learners", revenue: "Sponsorships, donations", features: ["Meetups", "Workshops"], market: "Reference BTC community in Burundi", risks: ["Volunteer dependency"], advantage: "Trust + grassroots reach", stack: ["WordPress / lightweight web"], team: "5 + volunteers" },
      { label: "1 Year", users: "3k learners", revenue: "4M FBU (programs + sponsorships)", features: ["Online cohorts", "Certificates"], market: "Formal learning provider", risks: ["Content scaling"], advantage: "Local-language content", stack: ["LMS + cohort tooling"], team: "12" },
      { label: "5 Years", users: "60k learners across EAC", revenue: "120M FBU (programs + B2B)", features: ["Corporate training", "Fintech, AI & cybersecurity tracks"], market: "Regional digital economy school", risks: ["Accreditation cycles"], advantage: "Local + diaspora alumni network", stack: ["Proprietary LMS", "Live cohort infra"], team: "80" },
      { label: "10 Years", users: "300k+ alumni", revenue: "700M FBU", features: ["University partnerships", "National curriculum input"], market: "SIGHT ACADEMY brand — regional reference", risks: ["Talent retention"], advantage: "Alumni → SIGHT employees, founders, partners", stack: ["AI-personalized learning"], team: "300" },
      { label: "Mature", users: "Pan-African talent engine", revenue: "Recurring B2B + government contracts", features: ["Apprenticeships", "Research"], market: "Tier-1 African tech institution", risks: ["Mission drift"], advantage: "Talent moat for the entire group", stack: ["Integrated with SIGHT LABS"], team: "Standalone subsidiary" },
    ],
  },
  {
    id: "afj",
    name: "AFRICA FINTECH JOURNAL",
    color: "from-rose-500/10",
    summary: "Independent media + research covering fintech, BTC, AI, startups, cyber.",
    stages: [
      { label: "Today", users: "Pre-launch / early readership", revenue: "0", features: ["Editorial pipeline", "Newsletter"], market: "Niche regional fintech voice", risks: ["Editorial quality"], advantage: "First-mover, founder credibility", stack: ["Ghost/Notion + CDN"], team: "3" },
      { label: "1 Year", users: "25k subscribers", revenue: "6M FBU (sponsorship + events)", features: ["Weekly newsletter", "Quarterly reports"], market: "Reference fintech publication in francophone Africa", risks: ["Ad revenue volatility"], advantage: "Trusted independent voice", stack: ["Headless CMS"], team: "8" },
      { label: "5 Years", users: "250k subscribers, 1M readers", revenue: "150M FBU (research + events + sponsorship)", features: ["Premium research", "Industry awards", "Annual summit"], market: "African fintech category-defining media", risks: ["Independence vs. monetization"], advantage: "Owned audience + data", stack: ["Custom publishing platform"], team: "45" },
      { label: "10 Years", users: "1M+ professional audience", revenue: "600M FBU", features: ["Research-as-a-service", "Indices & benchmarks"], market: "Standard reference for African digital economy", risks: ["Disruption from AI-generated content"], advantage: "Proprietary data + relationships", stack: ["Data products + AI publishing"], team: "180" },
      { label: "Mature", users: "Institutional clients (banks, DFIs, regulators)", revenue: "High-margin recurring", features: ["Africa Fintech Index", "Policy advisory"], market: "Equivalent of FT/Stratechery for African digital economy", risks: ["Trust capital"], advantage: "Editorial independence + data moat", stack: ["Internal AI editorial copilots"], team: "Standalone media subsidiary" },
    ],
  },
  {
    id: "yepo",
    name: "YEPO",
    color: "from-violet-500/10",
    summary: "AI marketplace — Africans access global AI services with local payment.",
    stages: [
      { label: "Today", users: "Early users", revenue: "Small margins on AI credits", features: ["Local payment for AI APIs"], market: "Niche but unique in BI", risks: ["AI provider terms"], advantage: "Payment localization", stack: ["Provider APIs + My Satoshis billing"], team: "4" },
      { label: "1 Year", users: "10k users + 200 SMEs", revenue: "12M FBU", features: ["Yepo Business", "Prompt library"], market: "AI access default for francophone Africa", risks: ["Margin compression"], advantage: "Distribution + billing", stack: ["Multi-provider router"], team: "15" },
      { label: "5 Years", users: "500k users, 8k SMEs", revenue: "500M FBU", features: ["Verticalized AI agents (legal, accounting, ag)", "Local LLM fine-tunes"], market: "African AI consumption platform", risks: ["Foundation model price wars"], advantage: "Local context + integrations", stack: ["Orchestration layer", "Vector + RAG infra"], team: "120" },
      { label: "10 Years", users: "5M users, 80k SMEs", revenue: "2,7 Mds FBU", features: ["Yepo Compute (GPUs)", "African-language LLMs"], market: "AI infrastructure for the continent", risks: ["Compute sovereignty"], advantage: "GPU access + local talent", stack: ["Owned GPU clusters via SIGHT COMPUTE"], team: "420" },
      { label: "Mature", users: "Default AI layer of the group", revenue: "Strategic infrastructure", features: ["Agent marketplace", "Industry copilots"], market: "Pan-African AI platform", risks: ["Geopolitical compute access"], advantage: "Owned compute + audience + payments", stack: ["Vertically integrated"], team: "Standalone subsidiary" },
    ],
  },
];

// PART 4 — Future products
export const FUTURE_PRODUCTS = [
  { code: "SIGHT CLOUD", role: "Sovereign cloud", why: "Local data residency for governments and regulated industries. Hard requirement for digital sovereignty.", born: "2028" },
  { code: "SIGHT ID", role: "Digital identity", why: "Reusable KYC and authentication across group products + third parties — the trust layer for everything else.", born: "2027" },
  { code: "SIGHT PAY", role: "Regional payment network", why: "Acquiring + cross-border rails connecting MNOs, banks and BTC liquidity.", born: "2028" },
  { code: "SIGHT LABS", role: "Applied R&D", why: "Cryptography, AI, hardware, civic tech — translates research to product.", born: "2029" },
  { code: "SIGHT CAPITAL", role: "Venture arm + fund", why: "Backs adjacent founders, sources M&A, extends the ecosystem.", born: "2029" },
  { code: "SIGHT ACADEMY", role: "Talent institution", why: "End-to-end engineer / operator pipeline; reduces hiring risk for the whole group.", born: "2028" },
  { code: "SIGHT DATA", role: "Data & analytics infra", why: "Group data platform + commercial analytics for banks, MNOs, regulators.", born: "2031" },
  { code: "SIGHT SECURITY", role: "Cybersecurity infra & SOC", why: "Critical for national + group resilience. Sellable as managed service.", born: "2030" },
  { code: "SIGHT MARKET", role: "Digital commerce rails", why: "Catalog + checkout + logistics handoff layer for SME commerce.", born: "2032" },
  { code: "SIGHT COMPUTE", role: "African GPU cloud", why: "AI sovereignty requires owned compute. Otherwise we are tenants forever.", born: "2033" },
  { code: "SIGHT GOV", role: "Government services platform", why: "White-label civic stack: portals, payments, ID, records.", born: "2030" },
  { code: "SIGHT HEALTH", role: "Health-data infrastructure", why: "Adjacent ID + data + payments use case with high public value.", born: "2032" },
  { code: "SIGHT AGRI", role: "Agricultural data & finance", why: "Combines DATA + PAY + COMPUTE for the continent's largest sector.", born: "2033" },
  { code: "SIGHT MEDIA", role: "Media holding (AFJ + adjacencies)", why: "Distribution + influence + research products.", born: "2030" },
  { code: "SIGHT FOUNDATION", role: "Public-interest arm", why: "Open-source, scholarships, civic tech. Protects the social license to operate.", born: "2029" },
];

// PART 5 — Organization
export const ORG = [
  {
    label: "Today",
    headcount: "~15",
    teams: ["Founder + ops", "My Satoshis eng", "LEARN BTC community", "AFJ editorial (forming)", "Yepo eng"],
  },
  {
    label: "1 Year",
    headcount: "~35",
    teams: ["CEO + COO", "Product (per product)", "Eng + SRE shared", "Compliance & Risk", "Marketing & Community", "Finance"],
  },
  {
    label: "5 Years",
    headcount: "~500",
    teams: [
      "Group CEO, CFO, COO, CTO, CISO, Chief Legal, Chief People",
      "Product subsidiaries (My Satoshis, Yepo, AFJ, Academy)",
      "Infrastructure: Cloud, ID, PAY, Security",
      "SIGHT LABS (R&D)",
      "SIGHT CAPITAL",
      "Regional country managers (BI, RW, DRC)",
    ],
  },
  {
    label: "10 Years",
    headcount: "~4,800",
    teams: [
      "Group holding + independent board",
      "9 country org with regional hubs",
      "Each subsidiary with its own P&L, MD and board",
      "Group platform org: PAY · ID · CLOUD · DATA · SECURITY",
      "SIGHT LABS as standalone R&D entity",
      "SIGHT CAPITAL with external LPs",
      "SIGHT FOUNDATION",
    ],
  },
];

// PART 6 — Phases
export const PHASES = [
  {
    name: "Foundation",
    years: "2026",
    goals: ["Unify group identity", "Stabilize MS + AFJ + Yepo + LEARN BTC", "Establish governance"],
    kpis: ["Monthly active users", "Gross margin per product", "Operational uptime"],
    revenue: "15M FBU",
    hiring: "+20",
    products: ["MS v2", "AFJ launch", "Yepo public"],
    funding: "Bootstrap + small angel (90M FBU)",
    risks: ["Founder bandwidth", "Regulatory clarity"],
    execution: "Tight focus on cashflow products; ruthlessly cut non-essential scope.",
  },
  {
    name: "Validation",
    years: "2027",
    goals: ["Repeatable revenue per product", "Hire senior product/eng", "Define group platform v0"],
    kpis: ["ARR growth", "CAC payback", "Retention"],
    revenue: "60M FBU",
    hiring: "+45",
    products: ["Yepo Business", "MS Merchant", "SIGHT ID alpha"],
    funding: "Seed round 60–120M FBU (strategic angels + 1 African VC)",
    risks: ["Hiring quality", "Compliance build-out"],
    execution: "Centralize platform (SSO, payments, data) while keeping product autonomy.",
  },
  {
    name: "Growth",
    years: "2028–2029",
    goals: ["Launch infrastructure products (PAY, CLOUD, ACADEMY)", "Open APIs", "Open Kigali office"],
    kpis: ["Platform revenue %", "API consumers", "Cross-product usage"],
    revenue: "220M → 600M FBU",
    hiring: "+340",
    products: ["SIGHT PAY", "SIGHT CLOUD r1", "SIGHT ACADEMY", "Developer portal"],
    funding: "Series A 300–450M FBU + DFI co-investment",
    risks: ["Operational complexity", "Talent ceiling"],
    execution: "Adopt subsidiary structure; introduce country managers; harden security & compliance.",
  },
  {
    name: "Regional Expansion",
    years: "2030–2032",
    goals: ["Operate in 3+ countries", "Government contracts", "Sovereign cloud certifications"],
    kpis: ["Cross-border TPV", "Government deals", "Sovereign workloads hosted"],
    revenue: "1,5 → 5,5 Mds FBU",
    hiring: "+1,500",
    products: ["SIGHT SECURITY", "SIGHT GOV", "SIGHT DATA", "SIGHT MARKET"],
    funding: "Series B/C 1,2–2,4 Mds FBU; blended capital with DFIs",
    risks: ["Regulatory fragmentation", "FX exposure", "Cyber threats"],
    execution: "Independent group board, audit committee, ERM framework, country compliance officers.",
  },
  {
    name: "Infrastructure Leadership",
    years: "2033–2035",
    goals: ["Foundational infra status", "Public listing or strategic capital", "African-owned compute"],
    kpis: ["Critical-infra designation", "Free cash flow", "Regional market share"],
    revenue: "9 → 18 Mds FBU",
    hiring: "+2,400",
    products: ["SIGHT COMPUTE", "Yepo Enterprise", "Pan-African APIs"],
    funding: "Pre-IPO / IPO / strategic minority partner",
    risks: ["Geopolitical pressure", "Scale governance"],
    execution: "IPO readiness: financial controls, board independence, M&A engine, ESG.",
  },
];

// PART 7 — Financial strategy (per phase)
export const FINANCIAL_STRATEGY = [
  { phase: "Foundation", bootstrap: "MS fees, LEARN BTC programs, AFJ sponsorships", revenue: "Transaction fees, programs, ads", grants: "Bitcoin Foundation, OSI-aligned funds", partnerships: "Local banks, MNOs", investors: "Angels (BTC + diaspora)", venture: "Not yet", sustainability: "Strict cost discipline; founder time = capital" },
  { phase: "Validation", bootstrap: "Yepo margins, MS B2B", revenue: "ARR per product", grants: "AfDB digital, GIZ, USADF", partnerships: "Telcos, 2 banks", investors: "African seed funds", venture: "Seed 60–120M FBU", sustainability: "Unit economics gate before scale spend" },
  { phase: "Growth", bootstrap: "Cross-sell across group", revenue: "Platform + SaaS + interchange", grants: "World Bank digital programs", partnerships: "Central banks, EAC", investors: "African + global early stage", venture: "Series A 300–450M FBU + DFI", sustainability: "Subsidiary P&Ls; each unit must justify capital" },
  { phase: "Regional Expansion", bootstrap: "Reinvest free cash from PAY & CLOUD", revenue: "Government contracts, recurring infra", grants: "Sovereign digital programs", partnerships: "Pan-African banks, Visa/Mastercard", investors: "Growth equity", venture: "Series B/C 1,2–2,4 Mds FBU + DFI co-invest", sustainability: "Treasury function + FX hedging" },
  { phase: "Infrastructure Leadership", bootstrap: "Cash-generating infra products", revenue: "Diversified — PAY, CLOUD, DATA, COMPUTE, ACADEMY", grants: "Climate-tech, AI sovereignty programs", partnerships: "AU, EAC, sovereign funds", investors: "Pre-IPO, sovereign LPs", venture: "IPO or strategic minority", sustainability: "Long-duration capital matched to long-duration infrastructure" },
];

// PART 8 — Execution playbook
export const PLAYBOOK = [
  {
    product: "My Satoshis",
    now: "Stabilize ops, compliance, merchant pilot",
    later: "Cross-border corridors, BaaS APIs",
    outsource: "Audit, pen-tests",
    internal: "Core ledger, KYC, treasury",
    automate: "Reconciliation, KYC scoring, fraud rules",
    manual: "High-value approvals, sanctioned-country reviews",
  },
  {
    product: "LEARN BTC → SIGHT ACADEMY",
    now: "Standardize cohort content, certificates",
    later: "Accredited diplomas, corporate training",
    outsource: "Specialist instructors initially",
    internal: "Curriculum, alumni community, LMS",
    automate: "Enrollment, grading, certificates",
    manual: "Mentorship, capstone reviews",
  },
  {
    product: "Africa Fintech Journal",
    now: "Editorial cadence, newsletter growth",
    later: "Research products, summit, indices",
    outsource: "Distribution, video production",
    internal: "Editorial, data, brand",
    automate: "Publishing, analytics, lead capture",
    manual: "Editorial judgment, source relationships",
  },
  {
    product: "Yepo",
    now: "Provider integrations, billing, prompt library",
    later: "Vertical agents, local LLMs, compute",
    outsource: "Model hosting (today)",
    internal: "Routing, billing, prompt IP, evals",
    automate: "Provisioning, billing, eval pipelines",
    manual: "Enterprise onboarding, custom agents",
  },
  {
    product: "SIGHT PAY",
    now: "Plan rails design, regulator engagement",
    later: "Cross-border, BaaS",
    outsource: "Card network certifications",
    internal: "Switch, risk engine, treasury",
    automate: "Settlement, reconciliation, fraud",
    manual: "Bank partnerships, regulator reporting",
  },
  {
    product: "SIGHT CLOUD",
    now: "Region 1 design + Tier-III partner",
    later: "Multi-region, sovereign certifications",
    outsource: "Power, physical security, hardware lease",
    internal: "Control plane, identity, billing",
    automate: "Provisioning, monitoring, patching",
    manual: "Customer onboarding (early)",
  },
  {
    product: "SIGHT ID",
    now: "Reusable KYC across group products",
    later: "Open ID provider for third parties",
    outsource: "Document liveness vendors initially",
    internal: "Identity graph, consent ledger",
    automate: "Verification, revocation, audit logs",
    manual: "Edge-case identity disputes",
  },
];

// PART 9 — Ecosystem map (logical clusters)
export const ECOSYSTEM = {
  layers: [
    {
      name: "Group",
      items: ["SIGHT AFRICA (holding)", "SIGHT CAPITAL", "SIGHT FOUNDATION", "SIGHT LABS"],
    },
    {
      name: "Infrastructure",
      items: ["SIGHT CLOUD", "SIGHT ID", "SIGHT PAY", "SIGHT DATA", "SIGHT SECURITY", "SIGHT COMPUTE"],
    },
    {
      name: "Platforms",
      items: ["My Satoshis", "Yepo", "SIGHT MARKET", "SIGHT GOV", "SIGHT HEALTH", "SIGHT AGRI"],
    },
    {
      name: "Talent & Voice",
      items: ["SIGHT ACADEMY (ex-LEARN BTC)", "Africa Fintech Journal", "SIGHT MEDIA"],
    },
  ],
};
