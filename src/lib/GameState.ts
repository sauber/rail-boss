/**
 * Game state interface defining the structure of the game's state
 */
import type { TrackInventory } from "./TrackInventory.ts";
import type { Station } from "./Station.ts";

export interface GameState {
  /**
   * Track inventory managing all track segments
   */
  inventory: TrackInventory;

  /**
   * Array of all stations in the game
   */
  stations: Station[];

  /**
   * Player's financial state
   */
  account: {
    balance: number;
    expenses: number;
    income: number;
  };
}
