// Potential partners per SIGHT AFRICA project — identified via public web sources (Sept 2026).
// Contacts are public channels (website / contact page / public email). Verify before outreach.
export type L = { fr: string; en: string };
const b = (fr: string, en: string): L => ({ fr, en });

export type Partner = {
  name: string;
  type: L;
  role: L;
  site: string;
  contact: string; // public contact page, email or phone
};
export type PartnerGroup = { project: string; note: L; partners: Partner[] };

const T = {
  telco: b("Opérateur télécom / mobile money", "Telecom / mobile money operator"),
  reg: b("Régulateur", "Regulator"),
  bank: b("Banque / finance", "Bank / finance"),
  dfi: b("Bailleur / institution de développement", "Donor / development institution"),
  grant: b("Fonds / subventions", "Grant fund"),
  tech: b("Partenaire technologique", "Technology partner"),
  edu: b("Éducation / incubation", "Education / incubation"),
  media: b("Média / réseau", "Media / network"),
  vc: b("Investisseur", "Investor"),
  gov: b("Institution publique", "Public institution"),
};

export const PARTNERS: PartnerGroup[] = [
  {
    project: "BitLibera",
    note: b("Rails de paiement, conformité et liquidité Bitcoin / mobile money.", "Payment rails, compliance and Bitcoin / mobile-money liquidity."),
    partners: [
      { name: "Lumitel – Lumicash", type: T.telco, role: b("Intégration mobile money (dépôts / retraits FBU)", "Mobile money integration (FBU cash-in / cash-out)"), site: "https://lumitel.bi", contact: "https://lumitel.bi · facebook.com/lumitelburundi" },
      { name: "Econet Leo – EcoCash", type: T.telco, role: b("Second rail mobile money", "Second mobile-money rail"), site: "https://www.econet.bi", contact: "https://www.econet.bi" },
      { name: "Banque de la République du Burundi (BRB)", type: T.reg, role: b("Cadre réglementaire, bac à sable fintech", "Regulatory framework, fintech sandbox"), site: "https://www.brb.bi", contact: "https://www.brb.bi (page Contact)" },
      { name: "Blink (Galoy)", type: T.tech, role: b("Infrastructure Lightning / API wallet", "Lightning infrastructure / wallet API"), site: "https://www.blink.sv", contact: "support@blink.sv" },
      { name: "Btrust", type: T.grant, role: b("Subventions développeurs Bitcoin en Afrique", "Grants for African Bitcoin developers"), site: "https://www.btrust.tech/grants", contact: "https://www.btrust.tech/grants/developer" },
    ],
  },
  {
    project: "LEARN BTC",
    note: b("Formation, certification et communauté Bitcoin.", "Bitcoin education, certification and community."),
    partners: [
      { name: "Btrust Pathways", type: T.edu, role: b("Parcours de formation développeurs", "Developer training pathways"), site: "https://pathways.btrust.tech", contact: "https://pathways.btrust.tech/home" },
      { name: "Africa Bitcoin Conference", type: T.media, role: b("Visibilité, réseau panafricain", "Visibility, pan-African network"), site: "https://afrobitcoin.org", contact: "https://afrobitcoin.org" },
      { name: "Bitcoin Dada", type: T.edu, role: b("Programmes pour femmes dans Bitcoin", "Women-in-Bitcoin programmes"), site: "https://bitcoindada.com", contact: "https://bitcoindada.com" },
      { name: "Université du Burundi", type: T.edu, role: b("Salles, étudiants, clubs universitaires", "Venues, students, campus clubs"), site: "https://ub.edu.bi", contact: "https://ub.edu.bi" },
    ],
  },
  {
    project: "AFJ",
    note: b("Média fintech : contenus, sponsors, événements.", "Fintech media: content, sponsors, events."),
    partners: [
      { name: "Techpoint Africa", type: T.media, role: b("Co-publication, échanges de contenus", "Co-publishing, content exchange"), site: "https://techpoint.africa", contact: "https://techpoint.africa/contact" },
      { name: "Disrupt Africa", type: T.media, role: b("Données startups africaines", "African startup data"), site: "https://disrupt-africa.com", contact: "https://disrupt-africa.com/contact" },
      { name: "Burundi Business Incubator (BBIN)", type: T.edu, role: b("Sources, événements, startups locales", "Sources, events, local startups"), site: "https://www.bbin.bi", contact: "https://www.bbin.bi/contact/" },
    ],
  },
  {
    project: "Yepo",
    note: b("Accès IA local : fournisseurs de modèles, cloud, paiement.", "Local AI access: model providers, cloud, billing."),
    partners: [
      { name: "Google for Startups Africa", type: T.tech, role: b("Crédits cloud / IA, accélérateur", "Cloud / AI credits, accelerator"), site: "https://startup.google.com/programs/accelerator/africa/", contact: "https://startup.google.com" },
      { name: "Microsoft for Startups Founders Hub", type: T.tech, role: b("Crédits Azure / OpenAI", "Azure / OpenAI credits"), site: "https://www.microsoft.com/startups", contact: "https://www.microsoft.com/startups" },
      { name: "Masakhane", type: T.tech, role: b("Modèles de langues africaines (kirundi)", "African-language models (Kirundi)"), site: "https://www.masakhane.io", contact: "https://www.masakhane.io" },
      { name: "Lacuna Fund", type: T.grant, role: b("Financement de jeux de données en langues africaines", "Funding for African-language datasets"), site: "https://lacunafund.org", contact: "https://lacunafund.org/contact" },
    ],
  },
  {
    project: "SIGHT ID · SIGHT GOV",
    note: b("Identité numérique et services publics.", "Digital identity and public services."),
    partners: [
      { name: "ARCT Burundi", type: T.reg, role: b("Régulation télécom / numérique", "Telecom / digital regulation"), site: "https://arct.gov.bi", contact: "https://arct.gov.bi" },
      { name: "Smart Africa", type: T.gov, role: b("Cadres d'identité et interopérabilité", "Identity & interoperability frameworks"), site: "https://smartafrica.org", contact: "https://smartafrica.org/contact-us" },
      { name: "Banque mondiale – ID4D", type: T.dfi, role: b("Programmes d'identité numérique", "Digital identity programmes"), site: "https://id4d.worldbank.org", contact: "https://id4d.worldbank.org" },
      { name: "MOSIP", type: T.tech, role: b("Plateforme d'identité open source", "Open-source identity platform"), site: "https://mosip.io", contact: "info@mosip.io" },
    ],
  },
  {
    project: "SIGHT PAY · SIGHT CAPITAL",
    note: b("Paiements marchands, financement et investissement.", "Merchant payments, funding and investment."),
    partners: [
      { name: "Interbank Burundi", type: T.bank, role: b("Carte / switch bancaire", "Card / banking switch"), site: "https://www.interbankbdi.com", contact: "https://www.interbankbdi.com" },
      { name: "KCB Bank Burundi", type: T.bank, role: b("Compte de règlement, trésorerie", "Settlement account, treasury"), site: "https://bi.kcbgroup.com", contact: "https://bi.kcbgroup.com" },
      { name: "Banque africaine de développement (BAD)", type: T.dfi, role: b("Programmes numériques, cofinancement", "Digital programmes, co-financing"), site: "https://www.afdb.org", contact: "https://www.afdb.org/en/contact-us" },
      { name: "USADF", type: T.grant, role: b("Subventions entreprises africaines", "Grants for African enterprises"), site: "https://www.usadf.gov", contact: "https://www.usadf.gov" },
      { name: "Launch Africa Ventures", type: T.vc, role: b("Capital d'amorçage", "Seed capital"), site: "https://launchafrica.vc", contact: "https://launchafrica.vc" },
    ],
  },
  {
    project: "SIGHT ACADEMY · SIGHT FOUNDATION",
    note: b("Talents, formation et impact social.", "Talent, training and social impact."),
    partners: [
      { name: "Enabel Burundi", type: T.dfi, role: b("Formation professionnelle, emploi des jeunes", "Vocational training, youth jobs"), site: "https://www.enabel.be/fr/pays/burundi/", contact: "https://www.enabel.be" },
      { name: "GIZ Burundi", type: T.dfi, role: b("Compétences numériques", "Digital skills"), site: "https://www.giz.de/en/worldwide/326.html", contact: "https://www.giz.de" },
      { name: "PNUD Burundi", type: T.dfi, role: b("Innovation, entrepreneuriat jeunes", "Innovation, youth entrepreneurship"), site: "https://www.undp.org/fr/burundi", contact: "https://www.undp.org/fr/burundi" },
      { name: "Tony Elumelu Foundation", type: T.grant, role: b("Capital d'amorçage entrepreneurs", "Seed capital for entrepreneurs"), site: "https://www.tonyelumelufoundation.org", contact: "https://www.tonyelumelufoundation.org" },
    ],
  },
  {
    project: "SIGHT CLOUD · SECURITY · DATA · COMPUTE",
    note: b("Infrastructure : hébergement, connectivité, cybersécurité.", "Infrastructure: hosting, connectivity, cybersecurity."),
    partners: [
      { name: "Burundi Backbone System (BBS)", type: T.telco, role: b("Fibre nationale, connectivité", "National fibre, connectivity"), site: "https://www.bbs.bi", contact: "https://www.bbs.bi" },
      { name: "Africa Data Centres", type: T.tech, role: b("Colocation régionale", "Regional colocation"), site: "https://www.africadatacentres.com", contact: "https://www.africadatacentres.com/contact" },
      { name: "AFRINIC", type: T.tech, role: b("Adresses IP, bonnes pratiques réseau", "IP addressing, network best practice"), site: "https://afrinic.net", contact: "https://afrinic.net/contact" },
      { name: "Cloudflare", type: T.tech, role: b("CDN, protection DDoS, sécurité", "CDN, DDoS protection, security"), site: "https://www.cloudflare.com", contact: "https://www.cloudflare.com/plans/enterprise/contact/" },
    ],
  },
  {
    project: "SIGHT AGRI · SIGHT HEALTH · SIGHT MARKET",
    note: b("Secteurs verticaux : agriculture, santé, commerce.", "Verticals: agriculture, health, commerce."),
    partners: [
      { name: "FIDA / IFAD", type: T.dfi, role: b("Programmes agricoles numériques", "Digital agriculture programmes"), site: "https://www.ifad.org", contact: "https://www.ifad.org/en/web/operations/w/country/burundi" },
      { name: "Ministère de la Santé publique (Burundi)", type: T.gov, role: b("Pilotes e-santé", "e-health pilots"), site: "https://www.minisante.gov.bi", contact: "https://www.minisante.gov.bi" },
      { name: "Chambre fédérale de commerce du Burundi (CFCIB)", type: T.gov, role: b("Réseau de commerçants", "Merchant network"), site: "https://www.cfcib.org", contact: "https://www.cfcib.org" },
    ],
  },
];
