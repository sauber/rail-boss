// src/lib/StationFactory.ts

/** List of the 25 largest Danish cities */
export const CITIES = [
  "København",
  "Aarhus",
  "Odense",
  "Aalborg",
  "Esbjerg",
  "Randers",
  "Kolding",
  "Horsens",
  "Vejle",
  "Roskilde",
  "Herning",
  "Helsingør",
  "Silkeborg",
  "Næstved",
  "Fredericia",
  "Børkop",
  "Holbæk",
  "Sønderborg",
  "Hjørring",
  "Viborg",
  "Køge",
  "Nykøbing",
  "Hillerød",
  "Ringsted",
  "Skive",
];

/** Minimum distance in pixels between stations */
export const MIN_DIST = 80;
/** Margin in pixels to keep stations fully visible inside the canvas */
export const MARGIN = 50;

/** Minimum distance in percentage (0-100) between stations for relative mode */
export const MIN_DIST_PCT = 10;
/** Margin in percentage (0-100) for relative mode */
export const MARGIN_PCT = 5;

/** Simple station data structure */
export interface Station {
  name: string;
  x: number;
  y: number;
}

/** Factory that creates stations ensuring unique names and spacing */
export class StationFactory {
  private usedNames = new Set<string>();
  private stations: Station[] = [];

  constructor(private width: number, private height: number) {}

  /** Get a random city name that hasn't been used yet */
  private getUnusedName(): string {
    const available = CITIES.filter((c) => !this.usedNames.has(c));
    if (available.length === 0) {
      throw new Error("No more unused city names available");
    }
    const name = available[Math.floor(Math.random() * available.length)];
    this.usedNames.add(name);
    return name;
  }

  /** Check if a point respects the minimum distance to existing stations */
  private isFarEnough(x: number, y: number): boolean {
    return this.stations.every(
      (s) => Math.hypot(s.x - x, s.y - y) >= MIN_DIST,
    );
  }

  /** Generate a single station with a valid position */
  private generateStation(): Station {
    let x: number, y: number;
    let attempts = 0;
    do {
      // Respect margin so the label stays inside the canvas
      x = MARGIN + Math.random() * (this.width - 2 * MARGIN);
      y = MARGIN + Math.random() * (this.height - 2 * MARGIN);
      attempts++;
      if (attempts > 1000) {
        throw new Error("Unable to place station with required spacing");
      }
    } while (!this.isFarEnough(x, y));
    return { name: this.getUnusedName(), x, y };
  }

  /** Public method to create N stations */
  public createStations(count: number): Station[] {
    for (let i = 0; i < count; i++) {
      this.stations.push(this.generateStation());
    }
    return this.stations;
  }

  /** Generate stations with relative coordinates (0-100%) */
  public createRelativeStations(
    count: number,
  ): { name: string; xPct: number; yPct: number }[] {
    // Reset used names for relative generation
    this.usedNames.clear();
    this.stations = [];

    const relativeStations: { name: string; xPct: number; yPct: number }[] = [];

    for (let i = 0; i < count; i++) {
      let xPct: number, yPct: number;
      let attempts = 0;
      let ok = false;
      do {
        // Respect margin in percentage
        xPct = MARGIN_PCT + Math.random() * (100 - 2 * MARGIN_PCT);
        yPct = MARGIN_PCT + Math.random() * (100 - 2 * MARGIN_PCT);
        attempts++;
        if (attempts > 1000) {
          throw new Error("Unable to place station with required spacing");
        }

        // Check minimum distance in percentage
        ok = true;
        for (const existing of relativeStations) {
          const dx = existing.xPct - xPct;
          const dy = existing.yPct - yPct;
          const dist = Math.hypot(dx, dy);
          if (dist < MIN_DIST_PCT) {
            ok = false;
            break;
          }
        }

        if (ok) {
          const name = this.getUnusedName();
          relativeStations.push({ name, xPct, yPct });
        }
      } while (!ok);
    }

    return relativeStations;
  }
}
