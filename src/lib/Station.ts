import { Passenger } from "./Passenger.ts";
import { StationSize } from "./StationSize.ts";

export { StationSize } from "./StationSize.ts";

export class Station {
  public id: string;
  public name: string;
  public colour: string;
  public size: StationSize;
  public x: number;
  public y: number;
  public platforms: number;
  public waitingPassengers: number;

  constructor(
    id: string,
    name: string,
    colour: string,
    size: StationSize,
    x: number,
    y: number,
  ) {
    this.id = id;
    this.name = name;
    this.colour = colour;
    this.size = size;
    this.x = x;
    this.y = y;
    this.platforms = size as number;
    this.waitingPassengers = 0;
  }

  public canAcceptMorePassengers(): boolean {
    return this.waitingPassengers < this.capacity();
  }

  public capacity(): number {
    return this.platforms;
  }

  public generatePassenger(): Passenger | null {
    if (this.canAcceptMorePassengers()) {
      const passenger = new Passenger(
        this.id,
        `Destination_${Math.floor(Math.random() * 1000)}`,
      );
      this.waitingPassengers++;
      return passenger;
    }
    return null;
  }

  public boardPassenger(): void {
    if (this.waitingPassengers > 0) {
      this.waitingPassengers--;
    }
  }

  public toString(): string {
    return `[Station ${this.name} (${this.id}) colour=${this.colour} waiting=${this.waitingPassengers}]`;
  }
}
