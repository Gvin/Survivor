import { ItemCreationService } from "../services/item-creation/item-creation.service";
import { GameItem } from "./items/game-item";
import { GameItemMemento } from "./mementos/game-item-memento";
import { InventoryMemento } from "./mementos/inventory-memento";

export interface GameInventoryStack {
    TopItem: GameItem;
    Count: number;
}

class GameInventoryStackImpl implements GameInventoryStack {
    private readonly items: GameItem[];

    constructor() {
        this.items = [];
    }

    public addItem(item: GameItem): void {
        this.items.push(item);
    }

    public removeItem(): void {
        this.items.pop();
    }

    public get TopItem(): GameItem {
        return this.items[0];
    }

    public get Items(): GameItem[] {
        return this.items;
    }

    public get Count(): number {
        return this.items.length;
    }
}

export class Inventory {
    private stacks: GameInventoryStackImpl[];

    constructor(data: InventoryMemento, itemCreationService: ItemCreationService) {
        this.stacks = [];
        
        data.items.map(itemMemento => itemCreationService.loadItem(itemMemento)).forEach(item => {
            this.addItem(item);
        });
    }

    public get Stacks(): GameInventoryStack[] {
        return this.stacks;
    }

    public addItem(item: GameItem): void {
        if (!item.Stackable || this.stacks.findIndex(stack => stack.TopItem.Id === item.Id) < 0) {
            let stack = new GameInventoryStackImpl();
            stack.addItem(item);
            this.stacks.push(stack);
        } else {
            let existingStack = this.stacks.find(stack => stack.TopItem.Id === item.Id);
            existingStack?.addItem(item);
        }
    }

    public removeItem(item: GameItem): void {
        const stackIndex = this.stacks.findIndex(stack => stack.TopItem.Id === item.Id);
        if (stackIndex < 0) {
            throw Error(`Item ${item} doesn't exist in inventory.`);
        }
        const stack = this.stacks[stackIndex];
        if (stack.Count === 1) {
            this.stacks = this.stacks.filter((_, index) => index !== stackIndex);
        } else {
            stack.removeItem();
        }
    }

    public getMemento(): InventoryMemento {
        let result: GameItemMemento[] = [];
        this.stacks.forEach(stack => {
            stack.Items.map(item => item.getMemento()).forEach(memento => {
                result.push(memento);
            });
        });
        return {
            items: result
        };
    }
}
