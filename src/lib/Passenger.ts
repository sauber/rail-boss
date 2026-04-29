/**
 * Passenger model – pure TypeScript representation of a passenger.
 *
 * Passengers have an origin station, a destination station, and a fare.
 * They can be in states: waiting, boarding, on-board, alighting, arrived.
 */
export enum PassengerState {
  Waiting = "waiting",
  Boarding = "boarding",
  OnBoard = "on-board",
  Alighting = "alighting",
  Arrived = "arrived",
}

export class Passenger {
  /** Unique identifier */
  public id: string;
  /** Origin station ID */
  public origin: string;
  /** Destination station ID */
  public destination: string;
  /** Fare paid upon arrival */
  public fare: number;
  /** Current state */
  public state: PassengerState;

  constructor(origin: string, destination: string) {
    this.id = `passenger_${Date.now()}_${
      Math.random().toString(36).substr(2, 9)
    }`;
    this.origin = origin;
    this.destination = destination;
    this.fare = 0; // calculated later based on distance and speed
    this.state = PassengerState.Waiting;
  }

  /**
   * Sets the fare based on distance and speed factor.
   */
  public setFare(distance: number, speedFactor: number = 1.0): void {
    // Base fare per unit distance, with a small discount for faster travel
    const baseRate = 10;
    const discount = speedFactor > 1.0 ? 0.95 : 1.0;
    this.fare = Math.round(baseRate * distance * discount);
  }

  /**
   * Transitions the passenger to the next state.
   */
  public transitionTo(state: PassengerState): void {
    this.state = state;
  }

  /**
   * Returns a string representation useful for debugging.
   */
  public toString(): string {
    return `[Passenger ${this.id} ${this.origin} -> ${this.destination} state=${this.state}]`;
  }
}
