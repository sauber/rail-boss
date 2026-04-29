/**
 * Station model – pure TypeScript representation of a game station.
 *
 * Stations have a unique name (from a list of Danish cities), a colour,
 * a size that determines platform count, and capacity for waiting passengers.
 * They can generate passengers and are involved in passenger boarding/alighting.
 */
import { Passenger } from "./Passenger.ts";

export enum StationSize {
  Small = 1,
  Medium = 2,
  Large = 3,
}

export class Station {
  /** Unique identifier (e.g., UUID or simple counter) */
  public id: string;
  /** Human‑readable name – must be unique among all stations */
  public name: string;
  /** Visual colour for UI rendering */
  public colour: string;
  /** Size determines number of platforms (capacity) */
  public size: StationSize;
  /** Number of platforms currently available (delegates to size) */
  public platforms: number;
  /** Current count of passengers waiting at the station */
  public waitingPassengers: number;

  constructor(
    id: string,
    name: string,
    colour: string,
    size: StationSize,
  ) {
    this.id = id;
    this.name = name;
    this.colour = colour;
    this.size = size;
    this.platforms = size as number;
    this.waitingPassengers = 0;
  }

  /**
   * Determines if the station can accept more passengers.
   */
  public canAcceptMorePassengers(): boolean {
    return this.waitingPassengers < this.capacity();
  }

  /**
   * Returns the station's capacity (number of platforms).
   */
  public capacity(): number {
    return this.platforms;
  }

  /**
   * Generates a new passenger if capacity allows.
   * In a full implementation this would consider reachable destinations
   * via existing tracks, but for the library stub we just create a placeholder.
   */
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

  /**
   * Reduces the waiting passenger count when a passenger boards a train.
   */
  public boardPassenger(): void {
    if (this.waitingPassengers > 0) {
      this.waitingPassengers--;
    }
  }

  /**
   * Returns a string representation useful for debugging.
   */
  public toString(): string {
    return `[Station ${this.name} (${this.id}) colour=${this.colour} waiting=${this.waitingPassengers}]`;
  }
}
