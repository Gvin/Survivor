import { GameItemMemento } from "../mementos/game-item-memento";

export class GameItem {
    private readonly type: string;
    private readonly id: string;
    private readonly name: string;
    private readonly description: string;

    constructor(data: GameItemMemento) {
        this.type = data.type;
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
    }

    public get Type(): string {
        return this.type;
    }

    public get Id(): string {
        return this.id;
    }

    public get Name(): string {
        return this.name;
    }

    public get Description(): string {
        return this.description;
    }

    public getMemento(): GameItemMemento {
        return {
            type: this.type,
            id: this.id,
            name: this.name,
            description: this.description
        };
    }
}
