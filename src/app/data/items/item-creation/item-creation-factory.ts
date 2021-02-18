import { GameItem } from "src/app/data/items/game-item";
import { ItemType } from "src/app/data/items/item-type";
import { SimpleGameItem } from "src/app/data/items/simple-game-item";
import { GameItemMemento } from "src/app/data/mementos/game-item-memento";
import { GameItemsMap } from "./items-map";
import { ConsumableGameItem } from "../consumable-game-item";

export class ItemCreationFactory {

    constructor(private readonly itemsMap: GameItemsMap) {
    }

    public createItem(itemId: string): GameItem {
        const itemMemento = this.getItemMemento(itemId);
        return this.loadItem(itemMemento);
    }

    public loadItem(itemMemento: GameItemMemento): GameItem {
        switch (itemMemento.type) {
            case ItemType.consumable:
                return new ConsumableGameItem(itemMemento);
            case ItemType.misc:  
                return new SimpleGameItem(itemMemento);
            default:
                throw Error(`Unknown item type: ${itemMemento.type}.`);
        }
    }

    public getItemMemento(itemId: string): GameItemMemento {
        const memento = this.itemsMap.items.find(item => item.id === itemId);
        if (!memento) {
            throw Error(`Unknown item id: ${itemId}.`);
        }

        return JSON.parse(JSON.stringify(memento)) as GameItemMemento;
    }
}
