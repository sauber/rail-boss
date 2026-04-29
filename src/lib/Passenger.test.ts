import { assertEquals } from "@std/assert";
import { Passenger, PassengerState } from "./Passenger.ts";

Deno.test("Passenger creation", () => {
  const passenger = new Passenger("stationA", "stationB");

  assertEquals(passenger.origin, "stationA");
  assertEquals(passenger.destination, "stationB");
  assertEquals(passenger.state, PassengerState.Waiting);
  assertEquals(typeof passenger.id, "string");
  assertEquals(passenger.fare, 0);
});

Deno.test("Passenger setFare", () => {
  const passenger = new Passenger("stationA", "stationB");

  passenger.setFare(100);
  assertEquals(passenger.fare, 1000);

  passenger.setFare(100, 1.2);
  assertEquals(passenger.fare, 950);

  passenger.setFare(50, 0.8);
  assertEquals(passenger.fare, 500);
});

Deno.test("Passenger state transitions", () => {
  const passenger = new Passenger("stationA", "stationB");

  passenger.transitionTo(PassengerState.Boarding);
  assertEquals(passenger.state, PassengerState.Boarding);

  passenger.transitionTo(PassengerState.OnBoard);
  assertEquals(passenger.state, PassengerState.OnBoard);

  passenger.transitionTo(PassengerState.Alighting);
  assertEquals(passenger.state, PassengerState.Alighting);

  passenger.transitionTo(PassengerState.Arrived);
  assertEquals(passenger.state, PassengerState.Arrived);
});

Deno.test("Passenger toString", () => {
  const passenger = new Passenger("stationA", "stationB");
  passenger.id = "test_passenger";

  const str = passenger.toString();
  assertEquals(
    str,
    "[Passenger test_passenger stationA -> stationB state=waiting]",
  );
});
