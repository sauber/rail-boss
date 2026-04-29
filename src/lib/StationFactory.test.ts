import { assertEquals } from "@std/assert";
import { StationFactory } from "./StationFactory.ts";

Deno.test("StationFactory", () => {
  const factory = new StationFactory(800, 800);
  const stations = factory.createStations(10);
  assertEquals(stations.length, 10);
});

Deno.test("StationFactory with relative coordinates", () => {
  const factory = new StationFactory(800, 800);
  const stations = factory.createRelativeStations(10);
  assertEquals(stations.length, 10);
});

Deno.test("StationFactory generates unique names", () => {
  const factory = new StationFactory(800, 800);
  const stations = factory.createStations(10);
  const names = new Set(stations.map((s) => s.name));
  assertEquals(names.size, 10);
});

Deno.test("StationFactory respects minimum distance", () => {
  const factory = new StationFactory(800, 800);
  const stations = factory.createStations(10);
  for (let i = 0; i < stations.length; i++) {
    for (let j = i + 1; j < stations.length; j++) {
      const dx = stations[i].x - stations[j].x;
      const dy = stations[i].y - stations[j].y;
      assertEquals(Math.hypot(dx, dy) >= 80, true);
    }
  }
});

Deno.test("StationFactory respects margin", () => {
  const factory = new StationFactory(800, 800);
  const stations = factory.createStations(10);
  for (const station of stations) {
    assertEquals(station.x >= 50 && station.x <= 750, true);
    assertEquals(station.y >= 50 && station.y <= 750, true);
  }
});
