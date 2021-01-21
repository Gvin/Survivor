import { GameItem } from "./items/game-item";
import { InventoryMemento } from "./mementos/inventory-memento";

export class Inventory {
    private items: GameItem[];

    constructor(data: InventoryMemento) {
        this.items = data.items.map(item => new GameItem(item))
    }

    public get Items(): GameItem[] {
        return this.items;
    }

    public getMemento(): InventoryMemento {
        return {
            items: this.items.map(item => item.getMemento())
        };
    }
}
