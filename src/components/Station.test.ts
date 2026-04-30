import { assertEquals } from "@std/assert";
import Station from "./Station.astro";

Deno.test("Station renders circle and label correctly", () => {
  const rendered =
    new Station({ id: "id1", x: 100, y: 100, label: "Station A" }).render()
      .html;

  assertEquals(rendered.includes("data-station-id"), true);
  assertEquals(rendered.includes("circle"), true);
  assertEquals(rendered.includes("text"), true);
});
