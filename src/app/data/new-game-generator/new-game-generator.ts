import { WaterType } from "src/app/data/mementos/game-location-memento";
import { GameMapMemento } from "src/app/data/mementos/game-map-memento";
import { GameMemento } from "src/app/data/mementos/game-memento";
import { ItemCreationFactory } from "../items/item-creation/item-creation-factory";
import { ItemIds } from "../items/item-creation/tropical-items-map";
import { GameRecipeMemento } from "../mementos/game-recipe-memento";

const locCamp = 'tropical.camp';
const locBeach = 'tropical.beach';
const locForest = 'tropical.forest';
const locCaves = 'tropical.caves';
const locSpring = 'tropical.spring';

export class NewGameGenerator {
    constructor(private readonly itemCreationFactory: ItemCreationFactory) {
    }

    public generateNewGame(): GameMemento {
        return {
            player: {
                health: 100,
                thirst: 10,
                hunger: 10,
                energy: 100,
                inventory: {
                    items: [
                        this.itemCreationFactory.getItemMemento(ItemIds.consumable.freshWaterBottle),
                        this.itemCreationFactory.getItemMemento(ItemIds.consumable.saltWaterBottle)
                    ]
                }
            },
            currentLocation: locBeach,
            environment: {
                temperature: 27.0,
                rain: false,
                time: new Date(2021, 7, 13, 11, 0).toString()
            },
            map: this.generateMap(),
            journal: {},
            recipes: this.generateRecipes()
        };
    }

    private generateRecipes(): GameRecipeMemento[] {
        return [
            { // Empty fresh water bottle
                outputItemId: ItemIds.misc.emptyBottle,
                outputCount: 1,
                parts: [{
                    itemId: ItemIds.consumable.freshWaterBottle,
                    count: 1,
                    consumed: true
                }]
            },
            { // Empty salt water bottle
                outputItemId: ItemIds.misc.emptyBottle,
                outputCount: 1,
                parts: [{
                    itemId: ItemIds.consumable.saltWaterBottle,
                    count: 1,
                    consumed: true
                }]
            }
        ];
    }

    private generateMap(): GameMapMemento {
        return {
            locations: [
                {
                    id: locCamp,
                    groundInventory: {items: []}
                },
                {
                    id: locBeach,
                    waterSource: WaterType.sea,
                    canSwim: true,
                    groundInventory: {items: []}
                },
                {
                    id: locForest,
                    groundInventory: {items: []}
                },
                {
                    id: locCaves,
                    groundInventory: {items: []}
                },
                {
                    id: locSpring,
                    waterSource: WaterType.clean,
                    canSwim: true,
                    groundInventory: {items: []}
                }
            ],
            connections: [
                {
                    locationA: locCamp,
                    locationB: locBeach,
                    walkTime: 15
                },
                {
                    locationA: locCamp,
                    locationB: locForest,
                    walkTime: 10
                },
                {
                    locationA: locForest,
                    locationB: locBeach,
                    walkTime: 10
                },
                {
                    locationA: locCamp,
                    locationB: locCaves,
                    walkTime: 15
                },
                {
                    locationA: locForest,
                    locationB: locCaves,
                    walkTime: 10
                },
                {
                    locationA: locCamp,
                    locationB: locSpring,
                    walkTime: 10
                },
                {
                    locationA: locForest,
                    locationB: locSpring,
                    walkTime: 5
                }
            ]
        };
    }
}
