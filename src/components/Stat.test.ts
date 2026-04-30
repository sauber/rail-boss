import { assertEquals } from "@std/assert";
import Stat from "./Stat.astro";

Deno.test("Stat renders label and value correctly", () => {
  const label = "Stations";
  const value = "4";
  // Simulate the rendered HTML structure of Stat.astro
  const rendered = new Stat({ label, value }).render().html;

  assertEquals(rendered.includes(label), true);
  assertEquals(rendered.includes(value), true);
  assertEquals(rendered.includes("stat-label"), true);
  assertEquals(rendered.includes("stat-value"), true);
});
