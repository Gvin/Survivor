import { Game } from "../game";
import { GameItem } from "../items/game-item";
import { ItemConsumedJournalMessage } from "../journal-messages/item-consumed-journal-message";
import { PlayerAction } from "./player-action";

export class ConsumeItemPlayerAction implements PlayerAction {

    constructor (private readonly item: GameItem) {
    }

    public perform(game: Game): number {
        game.Player.Inventory.removeItem(this.item);
        game.Journal.write(game, new ItemConsumedJournalMessage(this.item));
        return 1;
    }
}