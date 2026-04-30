import { assertEquals } from "@std/assert";
import ControlPanel from "./ControlPanel.astro";

Deno.test("ControlPanel has expected structure", () => {
  const componentContent = new ControlPanel().render().html;

  // Check that the component contains expected elements
  assertEquals(componentContent.includes("Rail Boss"), true);
  assertEquals(componentContent.includes("PURCHASE"), true);
  assertEquals(componentContent.includes("Regional"), true);
  assertEquals(componentContent.includes("Intercity"), true);
  assertEquals(componentContent.includes("Express"), true);
});
