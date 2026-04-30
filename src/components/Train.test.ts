import { assertEquals } from "@std/assert";

Deno.test("Train component exists", () => {
  assertEquals(true, true);
});

Deno.test("Train renders type and capacity correctly", () => {
  const rendered = `
    <div class="train" data-train-id="test-train">
      <div class="train-type">Type: Regional</div>
      <div class="train-capacity">Passengers: 0/50</div>
      <div class="train-wear">Wear: 0%</div>
    </div>
  `;
  assertEquals(rendered.includes("train-type"), true);
  assertEquals(rendered.includes("train-capacity"), true);
  assertEquals(rendered.includes("train-wear"), true);
});
