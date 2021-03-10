import { InventoryMemento } from "./inventory-memento";

export type GameLocationId = string;

export enum WaterType {
    clean = 'clean',
    dirty = 'dirty',
    sea = 'sea'
}

export interface GameLocationSearchItemReward {
    /**
     * Output item id.
     */
     itemId: string;

     /**
      * Minimal output items count for this result.
      */
     minCount: number;
 
     /**
      * Maximal output items count for this result.
      */
     maxCount: number;

     /**
     * Max items count that can present on location.
     */
    maxTotalCount: number;

    /**
     * Total items count present on location.
     */
    totalCount: number;

    /**
     * Refill rate per minute.
     */
    refillRate?: number;
}

export interface GameLocationSearchResult {

    itemReward?: GameLocationSearchItemReward;

    locationReward?: GameLocationId;

    /**
     * Chance to find this specific result.
     */
    chance: number;
}

export interface GameLocationMemento {
    id: GameLocationId;
    waterSource?: WaterType;
    canSwim?: boolean;
    groundInventory?: InventoryMemento;
    locked?: boolean;

    searchResults?: GameLocationSearchResult[];
}
