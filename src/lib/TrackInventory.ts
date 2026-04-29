/**
 * Track inventory – manages all track segments in the game.
 * Provides methods to add, retrieve, and iterate over tracks.
 */
import { Track } from "./Track";

export class TrackInventory {
  /** Map of track ID to Track instance */
  private tracks: Map<string, Track> = new Map();

  /**
   * Adds a track to the inventory.
   */
  public addTrack(track: Track): void {
    this.tracks.set(track.id, track);
  }

  /**
   * Retrieves a track by its ID.
   */
  public getTrack(id: string): Track | undefined {
    return this.tracks.get(id);
  }

  /**
   * Returns an array of all tracks.
   */
  public getAllTracks(): Track[] {
    return Array.from(this.tracks.values());
  }
}
