import { assertEquals } from "@std/assert";
import { Track, TrackState } from "./Track.ts";

Deno.test("Track creation", () => {
  const track = new Track("track1", "stationA", "stationB", 100);

  assertEquals(track.id, "track1");
  assertEquals(track.stationA, "stationA");
  assertEquals(track.stationB, "stationB");
  assertEquals(track.distance, 100);
  assertEquals(track.wear, 0);
  assertEquals(track.age, 0);
  assertEquals(track.occupied, false);
  assertEquals(track.purchasePrice, 10000);
});

Deno.test("Track otherStation", () => {
  const track = new Track("track1", "stationA", "stationB", 100);

  assertEquals(track.otherStation("stationA"), "stationB");
  assertEquals(track.otherStation("stationB"), "stationA");
  assertEquals(track.otherStation("stationC"), null);
});

Deno.test("Track passTrain increases wear", () => {
  const track = new Track("track1", "stationA", "stationB", 100);

  const initialWear = track.wear;
  track.passTrain();
  assertEquals(track.wear > initialWear, true);
});

Deno.test("Track state - usable", () => {
  const track = new Track("track1", "stationA", "stationB", 100);

  assertEquals(track.state(), TrackState.Usable);

  track.wear = 0.5;
  assertEquals(track.state(), TrackState.Usable);
});

Deno.test("Track state - degraded", () => {
  const track = new Track("track1", "stationA", "stationB", 100);

  track.wear = 0.6;
  assertEquals(track.state(), TrackState.Degraded);

  track.wear = 0.99;
  assertEquals(track.state(), TrackState.Degraded);
});

Deno.test("Track state - broken", () => {
  const track = new Track("track1", "stationA", "stationB", 100);

  track.wear = 1.0;
  assertEquals(track.state(), TrackState.Broken);

  track.wear = 1.5;
  assertEquals(track.state(), TrackState.Broken);
});

Deno.test("Track repairCost", () => {
  const track = new Track("track1", "stationA", "stationB", 100);

  const initialCost = track.repairCost();
  assertEquals(initialCost > 0, true);

  track.wear = 0.5;
  const midCost = track.repairCost();
  assertEquals(midCost > initialCost, true);

  track.age = 10;
  const agedCost = track.repairCost();
  assertEquals(agedCost > midCost, true);
});

Deno.test("Track repair resets wear", () => {
  const track = new Track("track1", "stationA", "stationB", 100);

  track.wear = 0.8;
  track.repair();
  assertEquals(track.wear, 0);
  assertEquals(track.age > 0, false);
});

Deno.test("Track tick increases age", () => {
  const track = new Track("track1", "stationA", "stationB", 100);

  const initialAge = track.age;
  track.tick();
  assertEquals(track.age, initialAge + 0.1);
});

Deno.test("Track toString", () => {
  const track = new Track("track1", "stationA", "stationB", 100);
  track.wear = 0.25;
  track.age = 1.0;

  const str = track.toString();
  assertEquals(str.includes("track1"), true);
  assertEquals(str.includes("stationA"), true);
  assertEquals(str.includes("stationB"), true);
});
