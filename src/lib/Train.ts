/**
 * Train model – pure TypeScript representation of a railway train.
 *
 * Trains have types (Regional, Intercity, Express) with different capacities,
 * speeds, and costs. They degrade over time and require repairs.
 */
export enum TrainType {
  Regional = "regional",
  Intercity = "intercity",
  Express = "express",
}

export class Train {
  /** Unique identifier */
  public id: string;
  /** Type of train (affects cost, speed, capacity) */
  public type: TrainType;
  /** Minimum and maximum passenger capacity */
  public minCapacity: number;
  public maxCapacity: number;
  /** Current number of passengers aboard */
  public passengers: number;
  /** Current wear level (0 = new, 1 = fully worn) */
  public wear: number;
  /** Age in arbitrary time units (increases repair cost) */
  public age: number;
  /** Purchase price (based on type) */
  public purchasePrice: number;
  /** Speed factor used for fare calculations and routing decisions */
  public speedFactor: number;

  constructor(type: TrainType) {
    this.id = `train_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.type = type;
    // Set base values based on type
    switch (type) {
      case TrainType.Regional:
        this.minCapacity = 20;
        this.maxCapacity = 50;
        this.purchasePrice = 5000;
        this.speedFactor = 0.8;
        break;
      case TrainType.Intercity:
        this.minCapacity = 50;
        this.maxCapacity = 150;
        this.purchasePrice = 15000;
        this.speedFactor = 1.0;
        break;
      case TrainType.Express:
        this.minCapacity = 100;
        this.maxCapacity = 300;
        this.purchasePrice = 30000;
        this.speedFactor = 1.2;
        break;
    }
    this.passengers = 0;
    this.wear = 0;
    this.age = 0;
  }

  /**
   * Applies wear from operation.
   */
  public operate(): void {
    const degradation = 0.05 * (1 + this.age * 0.02);
    this.wear = Math.min(1, this.wear + degradation);
  }

  /**
   * Returns the current state of the train.
   */
  public state(): string {
    if (this.wear >= 1) return "broken";
    return "operational";
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
   * Increases age (call this periodically in game loop).
   */
  public tick(): void {
    this.age += 0.1;
  }

  /**
   * Returns a string representation useful for debugging.
   */
  public toString(): string {
    return `[Train ${this.id} ${this.type} cap=${this.passengers}/${this.maxCapacity} wear=${
      this.wear.toFixed(2)
    } age=${this.age.toFixed(1)}]`;
  }
}
