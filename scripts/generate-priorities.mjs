// Generates the priorities file: public/sight-africa-priorities.docx + .pdf
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  Footer, PageNumber,
} from "docx";

const DATA = JSON.parse(execSync("bun run scripts/dump-data.ts", { encoding: "utf8" }));
const { PREP_YEAR, ROADMAP, FUTURE_PRODUCTS, PHASES } = DATA;

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
function H2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 320, after: 160 },
    children: [new TextRun({ text, bold: true, size: 28, color: TEAL, font: "Arial" })],
  });
}
function bullets(items) {
  return items.map((t) => new Paragraph({
    numbering: { reference: "dots", level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text: t, size: 22, color: CHARCOAL, font: "Arial" })],
  }));
}
function table(rows, widths) {
  const cols = rows[0].length;
  const cw = widths ?? Array.from({ length: cols }, () => Math.floor(W / cols));
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: cw,
    rows: rows.map((r, ri) => new TableRow({
      children: r.map((cell, ci) => new TableCell({
        borders: BORDERS,
        width: { size: cw[ci], type: WidthType.DXA },
        shading: ri === 0 ? { fill: "EEF4F4", type: ShadingType.CLEAR } : undefined,
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: String(cell), size: 20, bold: ri === 0, color: CHARCOAL, font: "Arial" })] })],
      })),
    })),
  });
}

const children = [
  new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "SIGHT AFRICA · STRATEGIC OPERATING SYSTEM", size: 18, color: TEAL, bold: true, font: "Arial" })] }),
  new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "Priorities", size: 56, bold: true, color: CHARCOAL, font: "Georgia" })] }),
  P("What must be done, in which order, and by when.", { color: MUTED, size: 24 }),
  P("Execution starts 1 January 2027 · 2026 is a preparation year outside the agenda · All amounts in FBU", { color: MUTED, size: 18, italics: true, after: 240 }),

  H2(`0. Preparation year ${PREP_YEAR.year} — before the agenda`),
  P(PREP_YEAR.note),
  ...bullets([
    "Legal structuring of the group and the first subsidiaries.",
    "Group identity, brand system and single sign-on design.",
    "Capital: bootstrap discipline plus first angel commitments.",
    "First senior hires and product readiness reviews.",
  ]),
];

children.push(H2("1. Yearly priorities (2027 → 2036)"));
for (const y of ROADMAP) {
  children.push(P(`${y.year} — ${y.theme}`, { bold: true, color: TEAL, size: 24, after: 80 }));
  children.push(...bullets(y.priorities));
  children.push(table([
    ["Revenue target", "Team", "Key releases"],
    [y.revenue, y.team, y.releases.join(" · ")],
  ], [2400, 1800, 5160]));
  children.push(P(""));
}

children.push(H2("2. Subsidiary launch order (2 to 3 per year)"));
children.push(table([
  ["Rank", "Entity", "Role", "Launch year", "Why now"],
  ...FUTURE_PRODUCTS.map((f, i) => [String(i + 1), f.code, f.role, f.born, f.why]),
], [700, 1700, 1800, 1000, 4160]));

children.push(H2("3. Phase priorities"));
children.push(table([
  ["Phase", "Years", "Priority goals", "Revenue", "Funding"],
  ...PHASES.map((p) => [p.name, p.years, p.goals.join(" · "), p.revenue, p.funding]),
], [1500, 1200, 3660, 1400, 1600]));

children.push(H2("4. Non-negotiable sequencing rules"));
children.push(...bullets([
  "Nothing launches before its dependency exists: ID before PAY, PAY before MARKET, CLOUD before GOV.",
  "A new entity is created only when internal demand already covers at least half of its cost base.",
  "Cash-generating products keep priority over infrastructure ambitions in any given year.",
  "Maximum three new entities per year — beyond that, execution quality collapses.",
  "Every priority carries one owner, one deadline and one measurable indicator.",
]));

const doc = new Document({
  numbering: {
    config: [{
      reference: "dots",
      levels: [{ level: 0, format: "bullet", text: "•", alignment: "left", style: { paragraph: { indent: { left: 460, hanging: 260 } } } }],
    }],
  },
  styles: { default: { document: { run: { font: "Arial", size: 22 } } } },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1200, right: 1440, bottom: 1200, left: 1440 } } },
    footers: {
      default: new Footer({
        children: [new Paragraph({ children: [
          new TextRun({ text: "SIGHT AFRICA · Priorities · Confidential · page ", size: 16, color: MUTED, font: "Arial" }),
          new TextRun({ children: [PageNumber.CURRENT], size: 16, color: MUTED, font: "Arial" }),
        ] })],
      }),
    },
    children,
  }],
});

const out = "public";
fs.writeFileSync(path.join(out, "sight-africa-priorities.docx"), await Packer.toBuffer(doc));
execSync(`libreoffice --headless --convert-to pdf --outdir ${out} ${out}/sight-africa-priorities.docx`, { stdio: "inherit" });
if (!fs.existsSync(path.join(out, "sight-africa-priorities.pdf"))) {
  console.error("PDF conversion failed");
  process.exit(1);
}
console.log("Generated public/sight-africa-priorities.docx + .pdf");
