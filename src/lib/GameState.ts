import { TrackInventory } from "./TrackInventory.ts";
import { Station, StationSize } from "./Station.ts";

export class GameState {
  inventory: TrackInventory;
  stations: Station[];
  account: {
    balance: number;
    expenses: number;
    income: number;
  };
  trains: any[];
  tracks: any[];
  isConnecting: boolean;
  selectedStation: string | null;

  constructor() {
    this.inventory = new TrackInventory();
    this.stations = [
      new Station(
        "Copenhagen",
        "Copenhagen",
        "#007bff",
        StationSize.Large,
        0,
        0,
      ),
      new Station("Aarhus", "Aarhus", "#28a745", StationSize.Medium, 100, 0),
      new Station("Odense", "Odense", "#dc3545", StationSize.Small, 200, 0),
    ];
    this.account = {
      balance: 10000,
      expenses: 0,
      income: 0,
    };
    this.trains = [];
    this.tracks = [];
    this.isConnecting = false;
    this.selectedStation = null;
  }
}
