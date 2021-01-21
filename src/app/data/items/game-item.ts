import { GameItemData, GameItemMemento } from "../mementos/game-item-memento";
import { ItemType } from "./item-type";

export class GameItem {
    private readonly types: string[];
    private readonly id: string;
    private readonly name: string;
    private readonly description: string;
    private readonly data?: GameItemData[];

    constructor(data: GameItemMemento) {
        this.types = data.types;
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.data = data.data;
    }

    public get Types(): string[] {
        return this.types;
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

    public get IsConsumable(): boolean {
        return this.types.indexOf(ItemType.consumable) >= 0;
    }

    public getData(key: string): string | undefined {
        let dataPiece = this.data?.find(d => d.key === key);
        return dataPiece?.value;
    }

    public getMemento(): GameItemMemento {
        return {
            types: this.types,
            id: this.id,
            name: this.name,
            description: this.description,
            data: this.data
        };
    }
}
