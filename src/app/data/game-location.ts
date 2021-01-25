import { GameLocationId, GameLocationMemento } from "./mementos/game-location-memento";

export class GameLocation {
    private id: GameLocationId;

    constructor(data: GameLocationMemento) {
        this.id = data.id;
    }

    public getMemento(): GameLocationMemento {
        return {
            id: this.id
        }
    }

    public get Id(): GameLocationId {
        return this.id;
    }
}
