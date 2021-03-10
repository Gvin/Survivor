import { InventoryMemento } from "./inventory-memento";

export type GameLocationId = string;

export enum WaterType {
    clean = 'clean',
    dirty = 'dirty',
    sea = 'sea'
}

export interface GameLocationSearchResult {
    itemId: string;
    count: number;
    singleUse?: boolean;
    chance: number;
    totalCount?: number;
    refillRate?: number;
}

export interface GameLocationMemento {
    id: GameLocationId;
    waterSource?: WaterType;
    canSwim?: boolean;
    groundInventory?: InventoryMemento;

    searchResults?: GameLocationSearchResult[];
}
