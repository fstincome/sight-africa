import { test, expect } from "bun:test";
import { PARTNERS } from "../src/lib/partners-data";
import { FUTURE_PRODUCTS } from "../src/lib/sight-data";

test("all 15 planned subsidiaries have affiliated partner candidates", () => {
  const covered = PARTNERS.flatMap((group) => group.project.split(" · ").map((name) => name.startsWith("SIGHT ") ? name : `SIGHT ${name}`));
  expect(FUTURE_PRODUCTS).toHaveLength(15);
  for (const product of FUTURE_PRODUCTS) expect(covered).toContain(product.code);
});

test("the four existing products have partner candidates", () => {
  for (const name of ["BitLibera", "LEARN BTC", "AFJ", "Yepo"]) {
    const group = PARTNERS.find((entry) => entry.project === name);
    expect(group?.partners.length ?? 0).toBeGreaterThan(0);
  }
});