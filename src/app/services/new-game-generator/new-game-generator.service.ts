import { Injectable } from "@angular/core";
import { GameMapMemento } from "src/app/data/mementos/game-map-memento";
import { GameMemento } from "src/app/data/mementos/game-memento";

const locCamp = 'camp';
const locBeach = 'beach';
const locForest = 'forest';
const locCaves = 'caves';
const locSpring = 'spring';

const itemType = {
    consumable: 'consumable'
}

@Injectable({providedIn: 'root'})
export class NewGameGeneratorService {
    public generateNewGame(): GameMemento {
        return {
            player: {
                health: 100,
                thirst: 10,
                hunger: 10,
                energy: 100,
                inventory: {
                    items: [
                        {
                            type: itemType.consumable,
                            id: 'fresh-water-bottle',
                            name: 'Fresh Water Bottle',
                            description: 'A bottle of fresh drinking water.'
                        }
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
            journal: {
                messages: []
            }
        };
    }

    private generateMap(): GameMapMemento {
        return {
            locations: [
                {
                    id: locCamp,
                    title: 'Camp'
                },
                {
                    id: locBeach,
                    title: 'Beach'
                },
                {
                    id: locForest,
                    title: 'Forest'
                },
                {
                    id: locCaves,
                    title: 'Caves'
                },
                {
                    id: locSpring,
                    title: 'Spring'
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