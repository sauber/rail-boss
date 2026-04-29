/**
 * Track model – pure TypeScript representation of a railway track segment.
 *
 * Tracks connect two stations, have a distance, degrade over time, and can be repaired.
 * Only one train may occupy a track at a time.
 */
export enum TrackState {
  Usable = "usable",
  Degraded = "degraded",
  Broken = "broken",
}

export class Track {
  /** Unique identifier */
  public id: string;
  /** First station ID */
  public stationA: string;
  /** Second station ID */
  public stationB: string;
  /** Distance between stations (affects cost and fare) */
  public distance: number;
  /** Current wear level (0 = new, 1 = fully worn) */
  public wear: number;
  /** Age in arbitrary time units (increases repair cost and degradation rate) */
  public age: number;
  /** Whether a train currently occupies this track */
  public occupied: boolean;
  /** Purchase price (based on distance) */
  public purchasePrice: number;

  constructor(
    id: string,
    stationA: string,
    stationB: string,
    distance: number,
  ) {
    this.id = id;
    this.stationA = stationA;
    this.stationB = stationB;
    this.distance = distance;
    this.wear = 0;
    this.age = 0;
    this.occupied = false;
    // Purchase price scales with distance
    this.purchasePrice = Math.round(distance * 100);
  }

  /**
   * Returns the other station ID given one endpoint.
   */
  public otherStation(stationId: string): string | null {
    if (stationId === this.stationA) return this.stationB;
    if (stationId === this.stationB) return this.stationA;
    return null;
  }

  /**
   * Applies wear from a passing train.
   * Degradation increases with age.
   */
  public passTrain(): void {
    const degradation = 0.1 * (1 + this.age * 0.05);
    this.wear = Math.min(1, this.wear + degradation);
  }

  /**
   * Returns the current state of the track.
   */
  public state(): TrackState {
    if (this.wear >= 1) return TrackState.Broken;
    if (this.wear > 0.5) return TrackState.Degraded;
    return TrackState.Usable;
  }

  /**
   * Calculates repair cost based on wear and age.
   */
  public repairCost(): number {
    const base = this.purchasePrice * 0.5;
    const wearMultiplier = 1 + this.wear;
    const ageMultiplier = 1 + this.age * 0.1;
    return Math.round(base * wearMultiplier * ageMultiplier);
  }

  /**
   * Repairs the track, resetting wear to zero but keeping age.
   */
  public repair(): void {
    this.wear = 0;
  }

  /**
   * Increases age (call this periodically in game loop).
   */
  public tick(): void {
    this.age += 0.1;
  }

  /**
   * Returns a string representation useful for debugging.
   */
  public toString(): string {
    return `[Track ${this.id} ${this.stationA}--${this.stationB} dist=${this.distance} wear=${
      this.wear.toFixed(2)
    } age=${this.age.toFixed(1)}]`;
  }
}
