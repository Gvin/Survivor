import { WaterType } from "src/app/data/mementos/game-location-memento";
import { GameMapMemento } from "src/app/data/mementos/game-map-memento";
import { GameMemento } from "src/app/data/mementos/game-memento";
import { ItemCreationFactory } from "../items/item-creation/item-creation-factory";
import { ItemIds } from "../items/item-creation/tropical-items-map";
import { GameBuildingRecipeMemento } from "../mementos/game-building-recipe-memento";
import { GameRecipeMemento } from "../mementos/game-recipe-memento";

const locations = {
    camp: 'tropical.camp',
    beach: 'tropical.beach',
    forest: 'tropical.forest',
    caves: 'tropical.caves',
    spring: 'tropical.spring'
}

const buildings = {
    campfire: 'campfire',

    shelter: 'shelter',
    hut: 'hut'
}

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
            currentLocation: locations.beach,
            environment: {
                temperature: 27.0,
                rain: false,
                time: new Date(2021, 7, 13, 11, 0).toString()
            },
            map: this.generateMap(),
            journal: {},
            recipes: this.generateRecipes(),
            buildingRecipes: this.generateBuildingRecipes()
        };
    }

    private generateBuildingRecipes(): GameBuildingRecipeMemento[] {
        return [
            {
                id: buildings.campfire,
                buildTime: 30,
                resources: [
                    {
                        itemId: ItemIds.misc.stone,
                        count: 10
                    },
                    {
                        itemId: ItemIds.misc.branch,
                        count: 10
                    }
                ],
                unlocked: true
            },
            {
                id: buildings.shelter,
                buildTime: 2 * 60,
                resources: [
                    {
                        itemId: ItemIds.misc.stone,
                        count: 8
                    },
                    {
                        itemId: ItemIds.misc.stick,
                        count: 8
                    },
                    {
                        itemId: ItemIds.misc.branch,
                        count: 15
                    }
                ],
                unlocked: true
            },
            {
                id: buildings.hut,
                baseBuildingId: buildings.shelter,
                buildTime: 12 * 60,
                resources: [
                    {
                        itemId: ItemIds.misc.stone,
                        count: 50
                    },
                    {
                        itemId: ItemIds.misc.stick,
                        count: 30
                    },
                    {
                        itemId: ItemIds.misc.branch,
                        count: 30
                    }
                ],
                unlocked: false,
                unlock: {
                    buldings: [buildings.shelter]
                }
            }
        ]
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
                    id: locations.camp,
                    locked: true
                },
                {
                    id: locations.beach,
                    waterSource: WaterType.sea,
                    canSwim: true,
                    searchResults: [
                        {
                            itemReward: {
                                itemId: ItemIds.misc.branch,
                                minCount: 1,
                                maxCount: 3,
                                maxTotalCount: 30,
                                totalCount: 30,
                                refillRate: 0.0035 // 1 per 4.8 hours
                            },
                            chance: 10
                        },
                        {
                            itemReward: {
                                itemId: ItemIds.misc.emptyBottle,
                                minCount: 1,
                                maxCount: 1,
                                maxTotalCount: 10,
                                totalCount: 10,
                                refillRate: 0.0007 // 1 per 1 day
                            },
                            chance: 5,
                        }
                    ]
                },
                {
                    id: locations.forest,
                    searchResults: [
                        {
                            itemReward: {
                                itemId: ItemIds.misc.branch,
                                minCount: 1,
                                maxCount: 5,
                                maxTotalCount: 100,
                                totalCount: 100,
                                refillRate: 0.007 // 1 per 2.4 hours
                            },
                            chance: 30,
                        },
                        {
                            locationReward: locations.spring,
                            chance: 20
                        },
                        {
                            locationReward: locations.camp,
                            chance: 30
                        },
                        {
                            locationReward: locations.caves,
                            chance: 10
                        }
                    ]
                },
                {
                    id: locations.caves,
                    locked: true
                },
                {
                    id: locations.spring,
                    waterSource: WaterType.clean,
                    canSwim: true,
                    locked: true
                }
            ],
            connections: [
                {
                    locationA: locations.camp,
                    locationB: locations.beach,
                    walkTime: 15
                },
                {
                    locationA: locations.camp,
                    locationB: locations.forest,
                    walkTime: 10
                },
                {
                    locationA: locations.forest,
                    locationB: locations.beach,
                    walkTime: 10
                },
                {
                    locationA: locations.camp,
                    locationB: locations.caves,
                    walkTime: 15
                },
                {
                    locationA: locations.forest,
                    locationB: locations.caves,
                    walkTime: 10
                },
                {
                    locationA: locations.camp,
                    locationB: locations.spring,
                    walkTime: 10
                },
                {
                    locationA: locations.forest,
                    locationB: locations.spring,
                    walkTime: 5
                }
            ]
        };
    }
}
