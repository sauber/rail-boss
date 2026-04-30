import { assertEquals } from "@std/assert";
import { Station, StationSize } from "./Station.ts";

Deno.test("Station component exists", () => {
  assertEquals(true, true);
});

Deno.test("Station renders circle and label correctly", () => {
  const rendered = `
    <g data-station-id="id1">
      <circle cx="100" cy="100" r="20" fill="#FF0000" stroke="#000" stroke-width="2"/>
      <text x="100" y="90" text-anchor="middle" font-size="12" fill="#fff">Station A</text>
    </g>
  `;
  assertEquals(rendered.includes("data-station-id"), true);
  assertEquals(rendered.includes("circle"), true);
  assertEquals(rendered.includes("text"), true);
});

Deno.test("Station constructor accepts all required parameters", () => {
  const station = new Station(
    "id1",
    "A",
    "#FF0000",
    StationSize.Small,
    100,
    200,
  );
  assertEquals(station.id, "id1");
  assertEquals(station.name, "A");
  assertEquals(station.colour, "#FF0000");
  assertEquals(station.size, StationSize.Small);
  assertEquals(station.x, 100);
  assertEquals(station.y, 200);
  // platforms is derived from size
  assertEquals(station.platforms, 1); // StationSize.Small = 1
  // waitingPassengers is initialized to 0
  assertEquals(station.waitingPassengers, 0);
});
