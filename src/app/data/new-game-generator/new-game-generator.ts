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
                        this.itemCreationFactory.getItemMemento(ItemIds.consumable.cleanWaterBottle),
                        this.itemCreationFactory.getItemMemento(ItemIds.consumable.saltWaterBottle),
                        this.itemCreationFactory.getItemMemento(ItemIds.misc.branch),
                        this.itemCreationFactory.getItemMemento(ItemIds.misc.stick),
                        this.itemCreationFactory.getItemMemento(ItemIds.misc.emptyBottle)
                    ]
                },
                knownItems: []
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
                time: 1,
                unlocked: true,
                parts: [{
                    itemId: ItemIds.consumable.cleanWaterBottle,
                    count: 1,
                    consumed: true,
                }]
            },
            { // Empty salt water bottle
                outputItemId: ItemIds.misc.emptyBottle,
                outputCount: 1,
                time: 1,
                unlocked: true,
                parts: [{
                    itemId: ItemIds.consumable.saltWaterBottle,
                    count: 1,
                    consumed: true
                }]
            },
            { // Fill salt water bottle
                outputItemId: ItemIds.consumable.saltWaterBottle,
                outputCount: 1,
                time: 1,
                unlocked: true,
                parts: [{
                    itemId: ItemIds.misc.emptyBottle,
                    count: 1,
                    consumed: true
                }],
                requiresWaterSource: WaterType.sea
            },
            { // Fill fresh water bottle
                outputItemId: ItemIds.consumable.cleanWaterBottle,
                outputCount: 1,
                time: 1,
                unlocked: true,
                parts: [{
                    itemId: ItemIds.misc.emptyBottle,
                    count: 1,
                    consumed: true
                }],
                requiresWaterSource: WaterType.clean
            },
            { // Create stick from branch
                outputItemId: ItemIds.misc.stick,
                outputCount: 1,
                time: 10,
                unlocked: false,
                parts: [{
                    itemId: ItemIds.misc.branch,
                    count: 1,
                    consumed: true
                }],
                unlock: {
                    knownItems: [ItemIds.misc.branch]
                }
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
                    groundInventory: {items: [this.itemCreationFactory.getItemMemento(ItemIds.misc.branch)]}
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
