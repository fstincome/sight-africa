import { expect, test } from "bun:test";
import { emptyPreparation, preparationSchema, isOverdue } from "../src/lib/preparation";
const record = () => emptyPreparation("https://lore.sightnetwork.org/");
test("preparation deadlines cannot reach January 2027", () => {
  const value = record(); value.steps[0].deadline = "2027-01-01";
  expect(preparationSchema.safeParse(value).success).toBe(false);
  value.steps[0].deadline = "2026-12-31";
  expect(preparationSchema.safeParse(value).success).toBe(true);
});
test("invalid calendar dates are rejected", () => {
  const value = record(); value.steps[0].deadline = "2026-02-30";
  expect(preparationSchema.safeParse(value).success).toBe(false);
});
test("only the five ecosystem sites can be tracked", () => {
  expect(preparationSchema.safeParse({ ...record(), site_url: "https://unknown.example/" }).success).toBe(false);
});
test("completed steps are not overdue", () => {
  const step = record().steps[0];
  expect(isOverdue(step, "2026-12-31")).toBe(true);
  expect(isOverdue({ ...step, status: "done" }, "2026-12-31")).toBe(false);
});