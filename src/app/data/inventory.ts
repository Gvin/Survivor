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

    public addItem(item: GameItem): void {
        this.items.push(item);
    }

    public removeItem(item: GameItem): void {
        const itemIndex = this.items.indexOf(item);
        if (itemIndex < 0) {
            throw Error(`Item ${item} doesn't exist in inventory.`);
        }

        this.items = this.items.filter((_, index) => index !== itemIndex);
    }

    public getMemento(): InventoryMemento {
        return {
            items: this.items.map(item => item.getMemento())
        };
    }
}
