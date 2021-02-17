import { ItemType } from "src/app/data/items/item-type";
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

export const tropicalItemsMap: GameItemsMap = {
    items: [
        // Bottled liquid
        {
            id: ItemIds.consumable.freshWaterBottle,
            type: ItemType.bottledLiquid,
            stackable: true,
            data: [
                {key: 'thirst', value: '-20'},
                {key: 'bottle', value: ItemIds.misc.emptyBottle}
            ]
        },
        {
            id: ItemIds.consumable.saltWaterBottle,
            type: ItemType.bottledLiquid,
            stackable: true,
            data: [
                {key: 'thirst', value: '10'},
                {key: 'bottle', value: ItemIds.misc.emptyBottle}
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
