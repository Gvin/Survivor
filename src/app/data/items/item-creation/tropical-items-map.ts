import { ItemType } from "src/app/data/items/item-type";
import { PlayerCharacteristic } from "../../player";
import { ConsumableGameItem, ConsumableGameItemData, ConsumableGameItemEffect } from "../consumable-game-item";
import { GameItemsMap } from "./items-map";

export const ItemIds = {
    consumable: {
        freshWaterBottle: 'fresh-water-bottle',
        saltWaterBottle: 'salt-water-bottle'
    },
    misc: {
        emptyBottle: 'empty-bottle',
        branch: 'branch',
        stick: 'stick'
    }
}

function stringify<T>(value: T): string {
    return JSON.stringify(value);
}

export const tropicalItemsMap: GameItemsMap = {
    items: [
        // Bottled liquid
        {
            id: ItemIds.consumable.freshWaterBottle,
            type: ItemType.consumable,
            stackable: true,
            data: [
                {key: ConsumableGameItem.SpecificDataKey, value: stringify<ConsumableGameItemData>({
                    actionNameKey: 'item-actions.drink.title',
                    actionDescriptionKey: 'item-actions.drink.tooltip',
                    consumeTime: 1,
                    consumedLeft: [ItemIds.misc.emptyBottle],
                    effects: [{
                        characteristic: PlayerCharacteristic.thirst,
                        change: -20
                    }]
                })}
            ]
        },
        {
            id: ItemIds.consumable.saltWaterBottle,
            type: ItemType.consumable,
            stackable: true,
            data: [
                {key: ConsumableGameItem.SpecificDataKey, value: stringify<ConsumableGameItemData>({
                    actionNameKey: 'item-actions.drink.title',
                    actionDescriptionKey: 'item-actions.drink.tooltip',
                    consumeTime: 1,
                    consumedLeft: [ItemIds.misc.emptyBottle],
                    effects: [{
                        characteristic: PlayerCharacteristic.thirst,
                        change: 10
                    }]
                })}
            ]
        },
        // Misc
        {
            id: ItemIds.misc.emptyBottle,
            type: ItemType.misc,
            stackable: true,
        },
        {
            id: ItemIds.misc.branch,
            type: ItemType.misc,
            stackable: true
        },
        {
            id: ItemIds.misc.stick,
            type: ItemType.misc,
            stackable: true
        }
    ]
};
