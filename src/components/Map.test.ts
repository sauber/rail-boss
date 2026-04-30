import { assertEquals } from "@std/assert";
import { Map } from "./Map.astro";

Deno.test("Map has expected structure", () => {
  // Test that the component contains expected elements
  const componentContent = new Map().render().html;

  // Check that the component contains expected elements
  assertEquals(componentContent.includes("map-container"), true);
  assertEquals(componentContent.includes("mapSvg"), true);
  assertEquals(componentContent.includes("tracksLayer"), true);
  assertEquals(componentContent.includes("stationsLayer"), true);
  assertEquals(componentContent.includes("trainsLayer"), true);
});
