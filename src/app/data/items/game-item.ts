import { Game } from "../game";
import { GameItemData, GameItemMemento } from "../mementos/game-item-memento";

export interface GameItemExtraAction {
    localizationKey: string;
    action: (game: Game) => boolean;
}

export abstract class GameItem {
    private readonly type: string;
    private readonly id: string;
    private readonly stackable: boolean;
    protected readonly data?: GameItemData[];

    constructor(memento: GameItemMemento) {
        this.type = memento.type;
        this.id = memento.id;
        this.stackable = memento.stackable;
        this.data = memento.data;
    }

    public get Type(): string {
        return this.type;
    }

    public get Id(): string {
        return this.id;
    }

    public get Stackable(): boolean {
        return this.stackable;
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
            stackable: this.stackable,
            data: this.data
        };
    }
}
