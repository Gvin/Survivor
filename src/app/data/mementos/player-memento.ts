import { InventoryMemento } from "./inventory-memento";

export interface PlayerMemento {
    health: number;
    thirst: number;
    hunger: number;
    energy: number;
    inventory: InventoryMemento;
    knownItems: string[];
}
