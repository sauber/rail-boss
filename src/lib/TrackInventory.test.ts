import { TrackInventory } from "./TrackInventory.ts";
import { Track } from "./Track.ts";
import { assertEquals } from "@std/assert";

Deno.test("TrackInventory", () => {
  const tracks = new TrackInventory();

  // Create test tracks
  const trackAB = new Track("track1", "stationA", "stationB", 100);
  const trackBC = new Track("track2", "stationB", "stationC", 150);

  // Add tracks to inventory
  tracks.addTrack(trackAB);
  tracks.addTrack(trackBC);

  // Test retrieval by ID
  assertEquals(tracks.getTrack("track1"), trackAB);
  assertEquals(tracks.getTrack("track2"), trackBC);

  // Test getAllTracks
  const allTracks = tracks.getAllTracks();
  assertEquals(allTracks.length, 2);
  assertEquals(allTracks[0], trackAB);
  assertEquals(allTracks[1], trackBC);

  // Test non-existent track
  assertEquals(tracks.getTrack("nonexistent"), undefined);
});
