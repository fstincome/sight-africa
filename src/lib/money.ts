// USD → FBU conversion utility.
// Indicative rate (June 2026): 1 USD ≈ 2 950 FBU.
export const FX_USD_FBU = 2950;

function nf(n: number, d = 1): string {
  return n.toLocaleString("fr-FR", { maximumFractionDigits: d, minimumFractionDigits: 0 });
}

export function formatFBU(usdAmount: number): string {
  const v = usdAmount * FX_USD_FBU;
  if (v >= 1e12) return `${nf(v / 1e12, 2)} Bn FBU`; // billions (1e12)
  if (v >= 1e9) return `${nf(v / 1e9, 1)} Md FBU`;
  if (v >= 1e6) return `${nf(v / 1e6, 0)} M FBU`;
  if (v >= 1e3) return `${nf(v / 1e3, 0)} k FBU`;
  return `${nf(v, 0)} FBU`;
}

// Replaces every "$N(.N)?[kMB]?" pattern in a string with its FBU equivalent.
export function convertMoneyStr(s: string): string {
  if (!s || typeof s !== "string") return s;
  return s.replace(/\$(\d+(?:[.,]\d+)?)\s*([kMB])?/g, (_m, num: string, suf?: string) => {
    let v = parseFloat(num.replace(",", "."));
    if (suf === "k") v *= 1;          // already in thousands of USD? No: $300k = 300,000 USD
    if (suf === "k") v = parseFloat(num.replace(",", ".")) * 1e3;
    else if (suf === "M") v = parseFloat(num.replace(",", ".")) * 1e6;
    else if (suf === "B") v = parseFloat(num.replace(",", ".")) * 1e9;
    return formatFBU(v);
  });
}
