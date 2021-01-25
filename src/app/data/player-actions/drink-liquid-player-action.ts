import { Game } from "../game";
import { BottledLiquidGameItem } from "../items/bottled-liquid-game-item";
import { GameItem } from "../items/game-item";
import { ItemConsumedJournalMessage } from "../journal-messages/item-consumed-journal-message";
import { ItemReceivedJournalMessage } from "../journal-messages/item-received-journal-message";
import { PlayerAction } from "./player-action";

export class DrinkLiquidPlayerAction implements PlayerAction {
    constructor(
        private readonly liquidItem: BottledLiquidGameItem,
        private readonly bottleItem: GameItem) {
    }

    perform(game: Game): void {
        game.Player.Inventory.removeItem(this.liquidItem);
        game.Journal.write(game, new ItemConsumedJournalMessage(this.liquidItem));
        game.processTimePassed(1);
        this.liquidItem.applyEffect(game.Player);
        game.Player.Inventory.addItem(this.bottleItem);
        game.Journal.write(game, new ItemReceivedJournalMessage(this.bottleItem));
    }
}
