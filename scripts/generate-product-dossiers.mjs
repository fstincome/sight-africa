// Generates one dossier per product: public/dossiers/<id>.docx + .pdf
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  Footer, PageNumber,
} from "docx";
import { DOSSIERS } from "./product-dossiers-data.mjs";

const DATA = JSON.parse(execSync("bun run scripts/dump-data.ts", { encoding: "utf8" }));
const { PRODUCTS, FUTURE_PRODUCTS } = DATA;

const TEAL = "0E7C7B";
const CHARCOAL = "1F2937";
const MUTED = "6B7280";
const W = 9360;

const B = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const BORDERS = { top: B, bottom: B, left: B, right: B };

function P(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 120 },
    children: [new TextRun({ text, size: opts.size ?? 22, color: opts.color ?? CHARCOAL, bold: !!opts.bold, italics: !!opts.italics, font: "Arial" })],
  });
}
function H1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 240, after: 200 },
    children: [new TextRun({ text, bold: true, size: 40, color: CHARCOAL, font: "Georgia" })],
  });
}
function H2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 320, after: 160 },
    children: [new TextRun({ text, bold: true, size: 26, color: TEAL, font: "Arial" })],
  });
}
function bullets(items) {
  return items.map((t) => new Paragraph({
    numbering: { reference: "dots", level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text: t, size: 22, color: CHARCOAL, font: "Arial" })],
  }));
}
function table(rows) {
  const cols = rows[0].length;
  const widths = Array.from({ length: cols }, () => Math.floor(W / cols));
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: widths,
    rows: rows.map((r, ri) => new TableRow({
      children: r.map((cell, ci) => new TableCell({
        borders: BORDERS,
        width: { size: widths[ci], type: WidthType.DXA },
        shading: ri === 0 ? { fill: "EEF4F4", type: ShadingType.CLEAR } : undefined,
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({
          children: [new TextRun({ text: String(cell), size: 20, bold: ri === 0, color: ri === 0 ? CHARCOAL : CHARCOAL, font: "Arial" })],
        })],
      })),
    })),
  });
}

function docFor(children) {
  return new Document({
    numbering: {
      config: [{
        reference: "dots",
        levels: [{ level: 0, format: "bullet", text: "•", alignment: "left", style: { paragraph: { indent: { left: 460, hanging: 260 } } } }],
      }],
    },
    styles: { default: { document: { run: { font: "Arial", size: 22 } } } },
    sections: [{
      properties: {
        page: { size: { width: 12240, height: 15840 }, margin: { top: 1200, right: 1440, bottom: 1200, left: 1440 } },
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({ children: [
            new TextRun({ text: "SIGHT AFRICA · Confidential product dossier · page ", size: 16, color: MUTED, font: "Arial" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 16, color: MUTED, font: "Arial" }),
          ] })],
        }),
      },
      children,
    }],
  });
}

function cover(title, subtitle, tag) {
  return [
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "SIGHT AFRICA · STRATEGIC OPERATING SYSTEM", size: 18, color: TEAL, bold: true, font: "Arial" })] }),
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: title, size: 56, bold: true, color: CHARCOAL, font: "Georgia" })] }),
    P(subtitle, { color: MUTED, size: 24 }),
    P(tag, { color: MUTED, size: 18, italics: true, after: 240 }),
  ];
}

function existingDossier(product) {
  const d = DOSSIERS[product.id];
  const ch = [
    ...cover(d.title, d.subtitle, "Execution starts 1 January 2027 · 2026 is a preparation year outside the agenda · All amounts in FBU"),
    H2("1. What we expect from this product"),
    P(d.expectation),
    ...bullets(d.outcomes),
    H2("2. Economic model"),
    table(d.model),
    H2("3. Investment required"),
    table(d.investment),
    H2("4. Feasibility assessment"),
    table(d.feasibility),
    H2("5. Technology & operating stack"),
    ...bullets(d.stack),
    H2("6. Key performance indicators"),
    table(d.kpis),
    H2("7. Risks & mitigations"),
    table(d.risks),
    H2("8. Ten-year trajectory"),
  ];
  for (const s of product.stages) {
    ch.push(P(s.label.toUpperCase(), { bold: true, color: TEAL, size: 22 }));
    ch.push(table([
      ["Dimension", "Detail"],
      ["Users", s.users],
      ["Revenue", s.revenue],
      ["Features", s.features.join(" · ")],
      ["Market position", s.market],
      ["Risks", s.risks.join(" · ")],
      ["Advantage", s.advantage],
      ["Stack", s.stack.join(" · ")],
      ["Team", s.team],
    ]));
    ch.push(P(""));
  }
  return docFor(ch);
}

function futureDossier(f) {
  const ch = [
    ...cover(f.code, f.role, `Planned incorporation: ${f.born} · Execution starts 1 January 2027 · All amounts in FBU`),
    H2("1. What we expect from this entity"),
    P(f.why),
    ...bullets([
      `Created in ${f.born}, once the ecosystem demand for ${f.role.toLowerCase()} is proven by group volume.`,
      "Serves group products first (internal customer), then external clients.",
      "Runs as a subsidiary with its own P&L, managing director and board.",
    ]),
    H2("2. Economic model"),
    table([
      ["Revenue line", "Mechanism", "Primary customer"],
      ["Internal services", "Transfer pricing to SIGHT subsidiaries", "Group products"],
      ["External subscriptions", "Recurring contracts, annual commitment", "Banks, MNOs, corporates"],
      ["Public-sector contracts", "Tendered multi-year contracts", "Governments, regulators"],
      ["Usage-based fees", "Per call / per unit consumed", "Developers, partners"],
    ]),
    H2("3. Investment required"),
    table([
      ["Phase", "Window", "Capital needed", "Main use"],
      ["Study & design", `${Number(f.born) - 1}`, "60 M FBU", "Feasibility, architecture, legal structure"],
      ["Incorporation & MVP", `${f.born}`, "450 M FBU", "Entity setup, core team, first platform"],
      ["Commercial ramp", `${Number(f.born) + 1}–${Number(f.born) + 3}`, "2 Mds FBU", "Sales, certification, capacity"],
      ["Consolidation", `${Number(f.born) + 4}+`, "Self-funded", "Reinvested cash flow"],
    ]),
    H2("4. Feasibility assessment"),
    table([
      ["Dimension", "Assessment", "Condition to satisfy"],
      ["Technical", "Conditional on group maturity", "Reuse of group platform (PAY · ID · CLOUD)"],
      ["Regulatory", "Sector-specific", "Licences and certifications obtained before launch"],
      ["Operational", "Medium", "Managing director recruited 12 months before launch"],
      ["Financial", "Funded by group cash flow + DFI debt", "Group EBITDA positive at incorporation"],
      ["Talent", "Medium", "Core team sourced from SIGHT ACADEMY alumni"],
    ]),
    H2("5. Decision rule"),
    ...bullets([
      "Build only when internal demand already justifies at least 50% of the cost base.",
      "Wait if the market is not ready or a partner can serve it better for now.",
      "Outsource the first version, then internalise once volume is proven.",
    ]),
    H2("6. Risks & mitigations"),
    table([
      ["Risk", "Impact", "Mitigation"],
      ["Premature launch", "High", "Gate on internal demand thresholds"],
      ["Capital diversion from core", "High", "Hard cap on group funding per entity"],
      ["Regulatory blockage", "Medium", "Pre-launch regulatory engagement"],
      ["Talent scarcity", "Medium", "Academy pipeline + diaspora recruitment"],
    ]),
  ];
  return docFor(ch);
}

const outDir = path.join("public", "dossiers");
fs.mkdirSync(outDir, { recursive: true });

const manifest = [];

for (const p of PRODUCTS) {
  if (!DOSSIERS[p.id]) continue;
  const buf = await Packer.toBuffer(existingDossier(p));
  const file = path.join(outDir, `${p.id}.docx`);
  fs.writeFileSync(file, buf);
  manifest.push({ id: p.id, name: p.name, kind: "current" });
}

function slug(code) {
  return code.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
for (const f of FUTURE_PRODUCTS) {
  const id = slug(f.code);
  const buf = await Packer.toBuffer(futureDossier(f));
  fs.writeFileSync(path.join(outDir, `${id}.docx`), buf);
  manifest.push({ id, name: f.code, kind: "future" });
}

execSync(`libreoffice --headless --convert-to pdf --outdir ${outDir} ${outDir}/*.docx`, { stdio: "inherit" });

const missing = manifest.filter((m) => !fs.existsSync(path.join(outDir, `${m.id}.pdf`)));
if (missing.length) {
  console.error("PDF conversion failed for:", missing.map((m) => m.id).join(", "));
  process.exit(1);
}
fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`Generated ${manifest.length} dossiers (docx + pdf) in ${outDir}`);
