import { GameLocationMemento } from "./mementos/game-location-memento";

export class GameLocation {
    private id: string;

    constructor(data: GameLocationMemento) {
        this.id = data.id;
    }

    public getMemento(): GameLocationMemento {
        return {
            id: this.id
        }
    }

    public get Id(): string {
        return this.id;
    }
}
