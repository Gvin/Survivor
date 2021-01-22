import { Game } from "../game";
import { EmptyItemJournalMessage } from "../journal-messages/empty-item-journal-message";
import { ItemReceivedJournalMessage } from "../journal-messages/item-received-journal-message";
import { GameItemMemento } from "../mementos/game-item-memento";
import { ConsumeItemPlayerAction } from "../player-actions/consume-item-player-action";
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
        game.performAction(new ConsumeItemPlayerAction(this));
        game.Player.Inventory.addItem(this.bottleItem);
        game.Journal.write(game, new ItemReceivedJournalMessage(this.bottleItem));
        return true;
    }
}
