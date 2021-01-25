import { Game } from "../game";
import { BottledLiquidGameItem } from "../items/bottled-liquid-game-item";
import { GameItem } from "../items/game-item";
import { EmptyItemJournalMessage } from "../journal-messages/empty-item-journal-message";
import { ItemReceivedJournalMessage } from "../journal-messages/item-received-journal-message";
import { PlayerAction } from "./player-action";

export class EmptyBottlePlayerAction implements PlayerAction {
    constructor(
        private readonly liquidItem: BottledLiquidGameItem,
        private readonly bottleItem: GameItem) {
    }

    public perform(game: Game): void {
        game.Journal.write(game, new EmptyItemJournalMessage(this.liquidItem));
        game.Player.Inventory.removeItem(this.liquidItem);
        game.processTimePassed(1);
        game.Player.Inventory.addItem(this.bottleItem);
        game.Journal.write(game, new ItemReceivedJournalMessage(this.bottleItem));
    }
}
