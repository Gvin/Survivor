import { Game } from "../game";
import { LocalizableString } from "../localizable-string";
import { GameItemMemento } from "../mementos/game-item-memento";
import { Player, PlayerCharacteristic } from "../player";
import { ConsumeItemPlayerAction } from "../player-actions/consume-item-player-action";
import { GameItem, GameItemExtraAction } from "./game-item";

export interface ConsumableGameItemEffect {
    characteristic: PlayerCharacteristic;
    change: number;
}

export interface ConsumableGameItemData {
    effects: ConsumableGameItemEffect[];
    consumedLeft: string[];
    consumeTime: number;
    actionNameKey: string;
    actionDescriptionKey: string;
}

export class ConsumableGameItem extends GameItem {
    public static readonly SpecificDataKey = 'specific-data';
    
    private readonly actions: GameItemExtraAction[];

    constructor(memento: GameItemMemento) {
        super(memento);

        const data = this.getSpecificData();

        this.actions =[{
            action: (game) => this.consumeItem(game),
            title: new LocalizableString().addLocalizable(data.actionNameKey),
            tooltip: new LocalizableString().addLocalizable(data.actionDescriptionKey)
        }];
    }

    public getExtraActions(): GameItemExtraAction[] {
        return this.actions;
    }

    private consumeItem(game: Game): boolean {
        game.performAction(new ConsumeItemPlayerAction(this));
        return false;
    }

    public applyEffect(player: Player): void {
        const data = this.getSpecificData();

        data.effects.forEach(effect => {
            const value = player.getCharacteristicValue(effect.characteristic);
            player.setCharacteristicValue(effect.characteristic, value + effect.change);
        });
    }

    public get ConsumedLeft(): string[] {
        const data = this.getSpecificData();
        return data.consumedLeft;
    }

    public get ConsumeTime(): number {
        const data = this.getSpecificData();
        return data.consumeTime;
    }

    private getSpecificData(): ConsumableGameItemData {
        const data = this.getDataSerialized<ConsumableGameItemData>(ConsumableGameItem.SpecificDataKey);
        if (!data) {
            throw Error(`Data not initialized for consumable item ${this.Id}.`);
        }
        return data;
    }
}
