import { Injectable } from "@angular/core";
import { GameItem } from "src/app/data/items/game-item";
import { ItemType } from "src/app/data/items/item-type";
import { BottledLiquidGameItem } from "src/app/data/items/liquid-game-item";
import { SimpleGameItem } from "src/app/data/items/simple-game-item";
import { GameItemMemento } from "src/app/data/mementos/game-item-memento";

export const ItemIds = {
    consumable: {
        freshWaterBottle: 'fresh-water-bottle',
        saltWaterBottle: 'salt-water-bottle'
    },
    misc: {
        emptyBottle: 'empty-bottle'
    }
}

@Injectable({providedIn: 'root'})
export class ItemCreationService {
    public createItem(itemId: string): GameItem {
        const itemMemento = this.getItemMemento(itemId);
        return this.loadItem(itemMemento);
    }

    public loadItem(itemMemento: GameItemMemento): GameItem {
        switch (itemMemento.type) {
            case ItemType.bottledLiquid:
                return new BottledLiquidGameItem(itemMemento, this.createItem(ItemIds.misc.emptyBottle));
            case ItemType.misc:  
            case ItemType.consumable:
                return new SimpleGameItem(itemMemento);
            default:
                throw Error(`Unknown item type: ${itemMemento.type}.`);
        }
    }

    public getItemMemento(itemId: string): GameItemMemento {
        switch (itemId) {
            case ItemIds.consumable.freshWaterBottle:
                return {
                    type: ItemType.bottledLiquid,
                    id: itemId,
                    name: 'Fresh Water Bottle',
                    description: 'A bottle of fresh drinking water.'
                };
            case ItemIds.consumable.saltWaterBottle:
                return {
                    type: ItemType.bottledLiquid,
                    id: itemId,
                    name: 'Salt Water Bottle',
                    description: 'A bottle of salt sea water.'
                }
            case ItemIds.misc.emptyBottle:
                return {
                    type: ItemType.misc,
                    id: itemId,
                    name: 'Empty Bottle',
                    description: 'Empty plastic bottle. Can be used to store liquids.'
                }
            default:
                throw Error(`Unknown item id: ${itemId}.`);
        }
    }
}
