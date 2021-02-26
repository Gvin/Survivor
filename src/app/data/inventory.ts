import { ItemCreationFactory } from "./items/item-creation/item-creation-factory";
import { GameItem } from "./items/game-item";
import { GameItemMemento } from "./mementos/game-item-memento";
import { InventoryMemento } from "./mementos/inventory-memento";
import { EventEmitter } from "@angular/core";

export interface GameInventoryStack {
    TopItem: GameItem;
    Count: number;
}

class GameInventoryStackImpl implements GameInventoryStack {
    private readonly items: GameItem[];

    public constructor() {
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
    public itemAdded: EventEmitter<GameItem>;
    private stacks: GameInventoryStackImpl[];

    constructor(data: InventoryMemento, itemCreationService: ItemCreationFactory) {
        this.itemAdded = new EventEmitter<GameItem>();

        this.stacks = [];
        
        data.items.map(itemMemento => itemCreationService.loadItem(itemMemento)).forEach(item => {
            this.addItem(item);
        });
    }

    public get Stacks(): GameInventoryStack[] {
        return this.stacks;
    }

    public get Count(): number {
        return this.stacks.reduce((sum, stack) => sum + stack.Count, 0);
    }

    public getItemsCount(itemId: string): number {
        const stack = this.stacks.find(stack => stack.TopItem.Id === itemId);
        if (!stack) {
            return 0;
        }

        return stack.Count;
    }

    public hasItem(itemId: string, count: number = 1): boolean {
        const stack = this.stacks.find(stack => stack.TopItem.Id === itemId);
        if (!stack) {
            return false;
        }

        return stack.Count >= count;
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

        this.itemAdded.next(item);
    }

    public removeItem(item: GameItem): void {
        this.removeItemById(item.Id);
    }

    public removeItemById(itemId: string): void {
        const stackIndex = this.stacks.findIndex(stack => stack.TopItem.Id === itemId);
        if (stackIndex < 0) {
            throw Error(`Item ${itemId} doesn't exist in inventory.`);
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
