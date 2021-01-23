import { Game } from "../game";
import { EmptyItemJournalMessage } from "../journal-messages/empty-item-journal-message";
import { ItemConsumedJournalMessage } from "../journal-messages/item-consumed-journal-message";
import { ItemReceivedJournalMessage } from "../journal-messages/item-received-journal-message";
import { GameItemMemento } from "../mementos/game-item-memento";
import { Player } from "../player";
import { GameItem, GameItemExtraAction } from "./game-item";

export class BottledLiquidGameItem extends GameItem {
    private readonly actions: GameItemExtraAction[];

    constructor(data: GameItemMemento, private readonly bottleItem: GameItem){
        super(data);

        this.actions = [
            {
                name: 'Drink',
                tooltip: 'Drink the liquid',
                action: (game: Game) => this.drinkLiquid(game)
            },
            {
                name: 'Empty',
                tooltip: 'Empty the bottle',
                action: (game: Game) => this.emptyBottle(game)
            }
        ];
    }

    public getExtraActions(): GameItemExtraAction[] {
        return this.actions;
    }

    private emptyBottle(game: Game): boolean {
        game.Journal.write(game, new EmptyItemJournalMessage(this));
        game.Player.Inventory.removeItem(this);
        game.Player.Inventory.addItem(this.bottleItem);
        game.Journal.write(game, new ItemReceivedJournalMessage(this.bottleItem));
        return true;
    }

    private drinkLiquid(game: Game): boolean {
        game.Player.Inventory.removeItem(this);
        game.Journal.write(game, new ItemConsumedJournalMessage(this));
        game.processTimePassed(1);
        this.applyEffect(game.Player);
        game.Player.Inventory.addItem(this.bottleItem);
        game.Journal.write(game, new ItemReceivedJournalMessage(this.bottleItem));
        return true;
    }

    private applyEffect(player: Player): void {
        if (!this.data) {
            return;
        }

        this.data.forEach(effect => {
            const value = Number(effect.value);
            switch (effect.key) {
                case 'thirst':
                    player.Thirst += value;
                    break;
                case 'hunger':
                    player.Hunger += value;
                    break;
                case 'health':
                    player.Health += value;
                    break;
                case 'energy':
                    player.Energy += value;
                    break;
                default:
                    throw Error(`Unknown effect type: ${effect.key},`);
            }
        });
    }
}
