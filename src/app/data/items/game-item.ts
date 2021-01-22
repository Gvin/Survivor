import { Game } from "../game";
import { GameItemData, GameItemMemento } from "../mementos/game-item-memento";

export interface GameItemExtraAction {
    name: string;
    tooltip: string;
    action: (game: Game) => boolean;
}

export abstract class GameItem {
    private readonly type: string;
    private readonly id: string;
    private readonly name: string;
    private readonly description: string;
    protected readonly data?: GameItemData[];

    constructor(data: GameItemMemento) {
        this.type = data.type;
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.data = data.data;
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

    public getData(key: string): string | undefined {
        let dataPiece = this.data?.find(d => d.key === key);
        return dataPiece?.value;
    }

    public abstract getExtraActions(): GameItemExtraAction[];

    public getMemento(): GameItemMemento {
        return {
            type: this.type,
            id: this.id,
            name: this.name,
            description: this.description,
            data: this.data
        };
    }
}
