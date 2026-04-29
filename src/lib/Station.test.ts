import { assertEquals } from "@std/assert";
import { Station, StationSize } from "./Station.ts";
import { Passenger } from "./Passenger.ts";

Deno.test("Station creation", () => {
  const station = new Station(
    "id1",
    "Copenhagen",
    "#FF0000",
    StationSize.Medium,
  );

  assertEquals(station.id, "id1");
  assertEquals(station.name, "Copenhagen");
  assertEquals(station.colour, "#FF0000");
  assertEquals(station.size, StationSize.Medium);
  assertEquals(station.platforms, 2);
  assertEquals(station.waitingPassengers, 0);
});

Deno.test("Station capacity", () => {
  const smallStation = new Station("id1", "A", "#FF0000", StationSize.Small);
  assertEquals(smallStation.capacity(), 1);

  const mediumStation = new Station("id2", "B", "#00FF00", StationSize.Medium);
  assertEquals(mediumStation.capacity(), 2);

  const largeStation = new Station("id3", "C", "#0000FF", StationSize.Large);
  assertEquals(largeStation.capacity(), 3);
});

Deno.test("Station canAcceptMorePassengers", () => {
  const station = new Station("id1", "A", "#FF0000", StationSize.Small);

  assertEquals(station.canAcceptMorePassengers(), true);

  station.waitingPassengers = 1;
  assertEquals(station.canAcceptMorePassengers(), false);
});

Deno.test("Station generatePassenger", () => {
  const station = new Station("id1", "A", "#FF0000", StationSize.Medium);

  const passenger = station.generatePassenger();
  assertEquals(passenger !== null, true);
  assertEquals(passenger?.origin, "id1");
  assertEquals(station.waitingPassengers, 1);

  const passenger2 = station.generatePassenger();
  assertEquals(passenger2 !== null, true);
  assertEquals(station.waitingPassengers, 2);

  station.waitingPassengers = 2;
  const passenger3 = station.generatePassenger();
  assertEquals(passenger3, null);
});

Deno.test("Station boardPassenger", () => {
  const station = new Station("id1", "A", "#FF0000", StationSize.Medium);
  station.waitingPassengers = 2;

  station.boardPassenger();
  assertEquals(station.waitingPassengers, 1);

  station.boardPassenger();
  assertEquals(station.waitingPassengers, 0);

  station.boardPassenger();
  assertEquals(station.waitingPassengers, 0);
});

Deno.test("Station toString", () => {
  const station = new Station(
    "id1",
    "Copenhagen",
    "#FF0000",
    StationSize.Large,
  );
  station.waitingPassengers = 3;

  const str = station.toString();
  assertEquals(str, "[Station Copenhagen (id1) colour=#FF0000 waiting=3]");
});
