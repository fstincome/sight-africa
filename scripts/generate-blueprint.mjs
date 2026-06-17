// Generates public/sight-africa-blueprint.docx — English, with FBU amounts.
import fs from "node:fs";
import path from "node:path";
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  PageBreak, LevelFormat, Table, TableRow, TableCell, WidthType,
  BorderStyle, ShadingType, PageOrientation, Footer, PageNumber, Header,
} from "docx";

// Mirror src/lib/money.ts rate
const FBU_PER_USD = 2950;
function fmtFBU(n) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(n)) + " FBU";
}
// Convert any USD token in a string to FBU. Handles $X, $Xk, $XM, $X.XM, ranges like $2–4M
function convertUSD(input) {
  if (input == null) return input;
  let s = String(input);
  // Range with suffix: $2–4M, $10-15M, $40–80M
  s = s.replace(/\$(\d+(?:\.\d+)?)\s*[–-]\s*(\d+(?:\.\d+)?)\s*([kKmMbB])?/g, (_, a, b, suf) => {
    const mul = suf ? { k: 1e3, K: 1e3, m: 1e6, M: 1e6, b: 1e9, B: 1e9 }[suf] : 1;
    return `${fmtFBU(parseFloat(a) * mul * FBU_PER_USD)} – ${fmtFBU(parseFloat(b) * mul * FBU_PER_USD)}`;
  });
  // Single with suffix: $640M, $300k
  s = s.replace(/\$(\d+(?:\.\d+)?)\s*([kKmMbB])/g, (_, a, suf) => {
    const mul = { k: 1e3, K: 1e3, m: 1e6, M: 1e6, b: 1e9, B: 1e9 }[suf];
    return fmtFBU(parseFloat(a) * mul * FBU_PER_USD);
  });
  // Bare $X
  s = s.replace(/\$(\d+(?:[.,]\d+)?)/g, (_, a) => fmtFBU(parseFloat(a.replace(",", "")) * FBU_PER_USD));
  return s;
}

// Load data by transpile-free dynamic import via tsx-like trick: parse the TS as text and eval the exports.
// Simpler: re-declare data inline by importing via a small JS shim.
// We use a child_process to read sight-data.ts with bun then JSON-dump.
import { execSync } from "node:child_process";
const dump = execSync("bun run scripts/dump-data.ts", { encoding: "utf8" });
const DATA = JSON.parse(dump);

const {
  SIGHT, NAV, END_STATE_2035, ROADMAP, PRODUCTS, FUTURE_PRODUCTS,
  ORG, PHASES, FINANCIAL_STRATEGY, PLAYBOOK, ECOSYSTEM,
} = DATA;

// --- Style helpers ---
const TEAL = "0E7C7B";
const CHARCOAL = "1F2937";
const MUTED = "6B7280";

function H1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 480, after: 240 },
    children: [new TextRun({ text, bold: true, size: 40, color: CHARCOAL, font: "Georgia" })],
  });
}
function H2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 360, after: 160 },
    children: [new TextRun({ text, bold: true, size: 30, color: TEAL, font: "Georgia" })],
  });
}
function H3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, size: 24, color: CHARCOAL })],
  });
}
function P(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120, line: 300 },
    children: [new TextRun({ text: convertUSD(text), size: 22, color: CHARCOAL, ...opts })],
  });
}
function Small(text) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [new TextRun({ text: convertUSD(text), size: 18, color: MUTED, italics: true })],
  });
}
function Bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { after: 80, line: 280 },
    children: [new TextRun({ text: convertUSD(text), size: 22, color: CHARCOAL })],
  });
}
function KV(label, value) {
  return new Paragraph({
    spacing: { after: 60 },
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 22, color: CHARCOAL }),
      new TextRun({ text: convertUSD(value), size: 22, color: CHARCOAL }),
    ],
  });
}
function PageBreakP() { return new Paragraph({ children: [new PageBreak()] }); }

function cell(text, opts = {}) {
  const { bold = false, shading, width = 2340, align } = opts;
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: shading ? { fill: shading, type: ShadingType.CLEAR, color: "auto" } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({
      alignment: align,
      children: [new TextRun({ text: convertUSD(text), size: 20, bold, color: CHARCOAL })],
    })],
  });
}
function table2col(rows) {
  const border = { style: BorderStyle.SINGLE, size: 4, color: "E5E7EB" };
  const borders = { top: border, bottom: border, left: border, right: border };
  const wrap = (children) => new TableCell({ ...children, borders });
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [3000, 6360],
    rows: rows.map(([k, v]) => new TableRow({
      children: [
        new TableCell({ borders, width: { size: 3000, type: WidthType.DXA }, shading: { fill: "F3F4F6", type: ShadingType.CLEAR, color: "auto" }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: k, bold: true, size: 20, color: CHARCOAL })] })] }),
        new TableCell({ borders, width: { size: 6360, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: convertUSD(String(v)), size: 20, color: CHARCOAL })] })] }),
      ],
    })),
  });
}

// --- Build content ---
const children = [];

// Cover
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 2400, after: 240 },
  children: [new TextRun({ text: SIGHT.name, bold: true, size: 72, color: CHARCOAL, font: "Georgia" })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 },
  children: [new TextRun({ text: SIGHT.tagline, size: 28, color: TEAL, italics: true, font: "Georgia" })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 1200 },
  children: [new TextRun({ text: "Strategic Operating System — 10-Year Blueprint (2026–2035)", size: 24, color: MUTED })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Confidential — all monetary values in Burundian Francs (FBU). Indicative conversion 1 USD ≈ 2,950 FBU.", size: 18, color: MUTED, italics: true })] }));
children.push(PageBreakP());

// Table of contents (manual)
children.push(H1("Contents"));
NAV.forEach((n, i) => children.push(Bullet(`${i + 1}. ${n.label}`)));
children.push(PageBreakP());

// 1. Overview
children.push(H1("1. Overview"));
children.push(H2("Vision"));
children.push(P(SIGHT.vision));
children.push(H2("Mission"));
children.push(P(SIGHT.mission));
children.push(H2("Values"));
SIGHT.values.forEach((v) => children.push(Bullet(v)));
children.push(H2("Strategic Pillars"));
[
  ["Sovereignty", "African-owned rails: payments, identity, cloud, AI compute."],
  ["Integration", "Each product reinforces the others; the group compounds."],
  ["Talent", "Build the institution that produces our future operators."],
  ["Capital discipline", "Cash-generating products fund the ambitious bets."],
].forEach(([k, v]) => children.push(KV(k, v)));
children.push(PageBreakP());

// 2. Vision 2035
children.push(H1("2. Vision 2035 — End State"));
children.push(P(END_STATE_2035.position));
children.push(H2("Headline KPIs (2035)"));
children.push(table2col(END_STATE_2035.stats.map((s) => [s.k, `${s.v} — ${s.note}`])));
children.push(H2("Strategic Influence"));
END_STATE_2035.influence.forEach((i) => children.push(Bullet(i)));
children.push(PageBreakP());

// 3. Roadmap
children.push(H1("3. Roadmap (2026–2035)"));
ROADMAP.forEach((y) => {
  children.push(H2(`${y.year} — ${y.theme}`));
  children.push(KV("Revenue target", y.revenue));
  children.push(KV("Team", y.team));
  children.push(H3("Priorities"));
  y.priorities.forEach((p) => children.push(Bullet(p)));
  children.push(H3("Key releases"));
  y.releases.forEach((p) => children.push(Bullet(p)));
  children.push(H3("Infrastructure"));
  y.infra.forEach((p) => children.push(Bullet(p)));
  children.push(H3("Partners"));
  y.partners.forEach((p) => children.push(Bullet(p)));
});
children.push(PageBreakP());

// 4. Products
children.push(H1("4. Products — Evolution"));
PRODUCTS.forEach((prod) => {
  children.push(H2(prod.name));
  children.push(P(prod.summary));
  prod.stages.forEach((s) => {
    children.push(H3(s.label));
    children.push(table2col([
      ["Users", s.users],
      ["Revenue", s.revenue],
      ["Market", s.market],
      ["Advantage", s.advantage],
      ["Team", s.team],
      ["Features", s.features.join(" · ")],
      ["Risks", s.risks.join(" · ")],
      ["Stack", s.stack.join(" · ")],
    ]));
    children.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "" })] }));
  });
});
children.push(PageBreakP());

// 5. Future Build
children.push(H1("5. Future Build — Planned Subsidiaries"));
FUTURE_PRODUCTS.forEach((f) => {
  children.push(H3(`${f.code} — ${f.role} (born ${f.born})`));
  children.push(P(f.why));
});
children.push(PageBreakP());

// 6. Organization
children.push(H1("6. Organization"));
ORG.forEach((o) => {
  children.push(H2(`${o.label} — ${o.headcount}`));
  o.teams.forEach((t) => children.push(Bullet(t)));
});
children.push(PageBreakP());

// 7. Phases
children.push(H1("7. Phases"));
PHASES.forEach((ph) => {
  children.push(H2(`${ph.name} (${ph.years})`));
  children.push(KV("Revenue", ph.revenue));
  children.push(KV("Hiring", ph.hiring));
  children.push(KV("Funding", ph.funding));
  children.push(KV("Execution", ph.execution));
  children.push(H3("Goals"));
  ph.goals.forEach((g) => children.push(Bullet(g)));
  children.push(H3("KPIs"));
  ph.kpis.forEach((g) => children.push(Bullet(g)));
  children.push(H3("Products in flight"));
  ph.products.forEach((g) => children.push(Bullet(g)));
  children.push(H3("Risks"));
  ph.risks.forEach((g) => children.push(Bullet(g)));
});
children.push(PageBreakP());

// 8. Financials
children.push(H1("8. Financial Strategy"));
FINANCIAL_STRATEGY.forEach((f) => {
  children.push(H2(f.phase));
  children.push(table2col([
    ["Bootstrap", f.bootstrap],
    ["Revenue", f.revenue],
    ["Grants", f.grants],
    ["Partnerships", f.partnerships],
    ["Investors", f.investors],
    ["Venture", f.venture],
    ["Sustainability", f.sustainability],
  ]));
});
children.push(PageBreakP());

// 9. Playbook
children.push(H1("9. Execution Playbook"));
PLAYBOOK.forEach((p) => {
  children.push(H2(p.product));
  children.push(table2col([
    ["Now", p.now],
    ["Later", p.later],
    ["Outsource", p.outsource],
    ["Keep internal", p.internal],
    ["Automate", p.automate],
    ["Keep manual", p.manual],
  ]));
});
children.push(PageBreakP());

// 10. Ecosystem
children.push(H1("10. Ecosystem Map"));
ECOSYSTEM.layers.forEach((layer) => {
  children.push(H2(layer.name));
  layer.items.forEach((it) => children.push(Bullet(it)));
});

// Closing
children.push(PageBreakP());
children.push(H1("Closing Note"));
children.push(P("SIGHT AFRICA is not a website builder. It is a long-term institutional bet on African-owned digital infrastructure. This document is the single canonical reference for founders, employees, investors and partners over the next ten years."));
children.push(Small("Confidential — for internal and authorized stakeholders only."));

// --- Document ---
const doc = new Document({
  creator: "SIGHT AFRICA",
  title: "SIGHT AFRICA — Strategic Operating System",
  description: "10-year blueprint, English edition, amounts in FBU.",
  styles: {
    default: { document: { run: { font: "Inter", size: 22, color: CHARCOAL } } },
  },
  numbering: {
    config: [{
      reference: "bullets",
      levels: [
        { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
        { level: 1, format: LevelFormat.BULLET, text: "◦", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1440, hanging: 360 } } } },
      ],
    }],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840, orientation: PageOrientation.PORTRAIT },
        margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
      },
    },
    headers: {
      default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "SIGHT AFRICA — Confidential", size: 16, color: MUTED })] })] }),
    },
    footers: {
      default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Page ", size: 16, color: MUTED }),
                   new TextRun({ children: [PageNumber.CURRENT], size: 16, color: MUTED })] })] }),
    },
    children,
  }],
});

const buf = await Packer.toBuffer(doc);
const out = path.join("public", "sight-africa-blueprint.docx");
fs.mkdirSync("public", { recursive: true });
fs.writeFileSync(out, buf);
console.log("Wrote", out, buf.length, "bytes");

try {
  execSync("libreoffice --headless --convert-to pdf --outdir public public/sight-africa-blueprint.docx", { stdio: "inherit" });
  console.log("Wrote public/sight-africa-blueprint.pdf");
} catch (e) {
  console.warn("PDF conversion failed:", e?.message);
}

