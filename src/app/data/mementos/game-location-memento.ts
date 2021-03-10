import { InventoryMemento } from "./inventory-memento";

export type GameLocationId = string;

export enum WaterType {
    clean = 'clean',
    dirty = 'dirty',
    sea = 'sea'
}

export interface GameLocationSearchResult {

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
     * Chance to find this specific result.
     */
    chance: number;

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

export interface GameLocationMemento {
    id: GameLocationId;
    waterSource?: WaterType;
    canSwim?: boolean;
    groundInventory?: InventoryMemento;

    searchResults?: GameLocationSearchResult[];
}
