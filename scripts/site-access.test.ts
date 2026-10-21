import { test, expect } from "bun:test";
import { handleSiteAccess } from "../src/lib/site-access";

const origin = "https://hub.sightnetwork.org";
const config = { email: "reader@example.test", password: "test-only-password", sessionSecret: "test-only-session-key-at-least-32-characters" };

test("signed-out readers cannot fetch confidential PDF, Word or JavaScript", async () => {
  for (const path of ["/sight-africa-blueprint.pdf", "/sight-africa-blueprint.docx", "/dossiers/bitlibera.pdf", "/assets/strategy.js"]) {
    const response = await handleSiteAccess(new Request(origin + path), config);
    expect(response?.status).toBe(401);
    expect(await response?.text()).toBe("Unauthorized");
  }
});

test("valid login creates HttpOnly cookie and admits refreshed document requests", async () => {
  const response = await handleSiteAccess(new Request(origin + "/api/site-session", { method: "POST", headers: { Origin: origin, Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ email: config.email, password: config.password }) }), config);
  expect(response?.status).toBe(200);
  const cookie = response?.headers.get("set-cookie") ?? "";
  expect(cookie).toContain("HttpOnly");
  expect(cookie).toContain("Secure");
  expect(cookie).toContain("SameSite=Strict");
  expect(await handleSiteAccess(new Request(origin + "/sight-africa-blueprint.pdf", { headers: { Cookie: cookie.split(";")[0] } }), config)).toBeNull();
});

test("wrong password, fabricated cookie and cross-origin login are denied", async () => {
  const request = (from: string, password: string) => new Request(origin + "/api/site-session", { method: "POST", headers: { Origin: from, Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ email: config.email, password }) });
  expect((await handleSiteAccess(request(origin, "wrong"), config))?.status).toBe(401);
  expect((await handleSiteAccess(request("https://attacker.test", config.password), config))?.status).toBe(403);
  expect((await handleSiteAccess(new Request(origin + "/", { headers: { Cookie: `sight_session=${Date.now() + 1000}.forged` } }), config))?.status).toBe(401);
});

test("logout clears cookie; missing deployment secrets fail closed", async () => {
  const response = await handleSiteAccess(new Request(origin + "/api/site-session", { method: "DELETE", headers: { Origin: origin } }), config);
  expect(response?.headers.get("set-cookie")).toContain("Max-Age=0");
  expect((await handleSiteAccess(new Request(origin + "/"), {}))?.status).toBe(503);
});