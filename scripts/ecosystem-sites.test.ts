import { expect, test } from "bun:test";
import { ECOSYSTEM_SITES } from "../src/lib/ecosystem-sites";

test("all five user-confirmed addresses are available", () => {
  expect(ECOSYSTEM_SITES.filter((site) => site.available).map((site) => site.url)).toEqual([
    "https://lore.sightnetwork.org/",
    "https://signal.sightnetwork.org/",
    "https://coreapp.sightnetwork.org/",
    "https://family.sightnetwork.org/",
    "https://www.core.sightnetwork.org/",
  ]);
});

test("commercialization starts January 2027, not during preparation", () => {
  expect(ECOSYSTEM_SITES.map((site) => site.commercializationDate)).toEqual(Array(5).fill("2027-01-01"));
});