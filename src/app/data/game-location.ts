import { GameLocationMemento } from "./mementos/game-location-memento";

export class GameLocation {
    private title: string;
    private id: string;

    constructor(data: GameLocationMemento) {
        this.title = data.title;
        this.id = data.id;
    }

    public getMemento(): GameLocationMemento {
        return {
            title: this.title,
            id: this.id
        }
    }

    public get Title(): string {
        return this.title;
    }

    public get Id(): string {
        return this.id;
    }
}
