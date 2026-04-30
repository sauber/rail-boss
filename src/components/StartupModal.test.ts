import { assertEquals } from "@std/assert";
import StartupModal from "./StartupModal.astro";

Deno.test("StartupModal renders correctly", () => {
  const componentContent = new StartupModal().render().html;

  assertEquals(componentContent.includes("Welcome to Rail Boss!"), true);
  assertEquals(componentContent.includes("modal-overlay"), true);
  assertEquals(componentContent.includes("modal-content"), true);
  assertEquals(componentContent.includes("modal-header"), true);
  assertEquals(componentContent.includes("modal-body"), true);
  assertEquals(componentContent.includes("modal-title"), true);
  assertEquals(componentContent.includes("modal-close"), true);
});
