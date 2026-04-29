import { assertEquals } from "@std/assert";
import { Train, TrainType } from "./Train.ts";

Deno.test("Train creation - Regional", () => {
  const train = new Train(TrainType.Regional);

  assertEquals(train.type, TrainType.Regional);
  assertEquals(train.minCapacity, 20);
  assertEquals(train.maxCapacity, 50);
  assertEquals(train.purchasePrice, 5000);
  assertEquals(train.speedFactor, 0.8);
  assertEquals(train.passengers, 0);
  assertEquals(train.wear, 0);
  assertEquals(train.age, 0);
  assertEquals(typeof train.id, "string");
});

Deno.test("Train creation - Intercity", () => {
  const train = new Train(TrainType.Intercity);

  assertEquals(train.type, TrainType.Intercity);
  assertEquals(train.minCapacity, 50);
  assertEquals(train.maxCapacity, 150);
  assertEquals(train.purchasePrice, 15000);
  assertEquals(train.speedFactor, 1.0);
});

Deno.test("Train creation - Express", () => {
  const train = new Train(TrainType.Express);

  assertEquals(train.type, TrainType.Express);
  assertEquals(train.minCapacity, 100);
  assertEquals(train.maxCapacity, 300);
  assertEquals(train.purchasePrice, 30000);
  assertEquals(train.speedFactor, 1.2);
});

Deno.test("Train operate increases wear", () => {
  const train = new Train(TrainType.Regional);

  const initialWear = train.wear;
  train.operate();
  assertEquals(train.wear > initialWear, true);
});

Deno.test("Train state - operational", () => {
  const train = new Train(TrainType.Regional);

  assertEquals(train.state(), "operational");

  train.wear = 0.99;
  assertEquals(train.state(), "operational");
});

Deno.test("Train state - broken", () => {
  const train = new Train(TrainType.Regional);

  train.wear = 1.0;
  assertEquals(train.state(), "broken");

  train.wear = 1.5;
  assertEquals(train.state(), "broken");
});

Deno.test("Train repairCost", () => {
  const train = new Train(TrainType.Regional);

  const initialCost = train.repairCost();
  assertEquals(initialCost > 0, true);

  train.wear = 0.5;
  const midCost = train.repairCost();
  assertEquals(midCost > initialCost, true);

  train.age = 10;
  const agedCost = train.repairCost();
  assertEquals(agedCost > midCost, true);
});

Deno.test("Train tick increases age", () => {
  const train = new Train(TrainType.Regional);

  const initialAge = train.age;
  train.tick();
  assertEquals(train.age, initialAge + 0.1);
});

Deno.test("Train toString", () => {
  const train = new Train(TrainType.Express);
  train.id = "test_train";
  train.passengers = 50;
  train.wear = 0.3;
  train.age = 2.0;

  const str = train.toString();
  assertEquals(str.includes("test_train"), true);
  assertEquals(str.includes("express"), true);
  assertEquals(str.includes("50/300"), true);
});
