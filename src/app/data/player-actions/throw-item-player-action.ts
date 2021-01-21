import { Game } from "../game";
import { GameItem } from "../items/game-item";
import { ItemThrownJournalMessage } from "../journal-messages/item-thrown-journal-message";
import { PlayerAction } from "./player-action";

export class ThrowItemPlayerAction implements PlayerAction {
    constructor(private readonly item: GameItem) {
    }

    public perform(game: Game): number {
        game.Player.Inventory.removeItem(this.item);
        game.Journal.write(game, new ItemThrownJournalMessage(this.item));
        return 0;
    }
}
