import { LocaleNamespace } from "src/app/services/game-localization/localization.service";
import { Game } from "../game";
import { LocalizableString } from "../localizable-string";
import { GameItemData, GameItemMemento } from "../mementos/game-item-memento";

export interface GameItemExtraAction {
    title: LocalizableString;
    tooltip: LocalizableString;
    action: (game: Game) => boolean;
}

export abstract class GameItem {
    private readonly type: string;
    private readonly id: string;
    private readonly stackable: boolean;
    private readonly data?: GameItemData[];

    private readonly name: LocalizableString;
    private readonly useName: LocalizableString;
    private readonly multiName: LocalizableString;
    private readonly description: LocalizableString;

    constructor(memento: GameItemMemento) {
        this.type = memento.type;
        this.id = memento.id;
        this.stackable = memento.stackable;
        this.data = memento.data;

        this.name = GameItem.getName(this.Id);
        this.useName = GameItem.getUseName(this.Id);
        this.multiName = GameItem.getMultiName(this.Id);
        this.description = GameItem.getDescription(this.Id);
    }

    public static getName(itemId: string): LocalizableString {
        return new LocalizableString().addLocalizable(`${itemId}.name`, LocaleNamespace.items);
    }

    public static getUseName(itemId: string): LocalizableString {
        return new LocalizableString().addLocalizable(`${itemId}.useName`, LocaleNamespace.items);
    }

    public static getMultiName(itemId: string): LocalizableString {
        return new LocalizableString().addLocalizable(`${itemId}.multiName`, LocaleNamespace.items);
    }

    public static getDescription(itemId: string): LocalizableString {
        return new LocalizableString().addLocalizable(`${itemId}.description`, LocaleNamespace.items);
    }

    public get Name(): LocalizableString {
        return this.name;
    }

    public get UseName(): LocalizableString {
        return this.useName;
    }

    public get MultiName(): LocalizableString {
        return this.multiName;
    }

    public get Description(): LocalizableString {
        return this.description;
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

    protected getData(key: string): string | undefined {
        let dataPiece = this.data?.find(d => d.key === key);
        return dataPiece?.value;
    }

    protected getDataSerialized<T>(key: string): T | undefined {
        const data = this.getData(key);
        return data ? JSON.parse(data) as T : undefined;
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
