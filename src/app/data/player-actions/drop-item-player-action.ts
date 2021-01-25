import { Game } from "../game";
import { GameItem } from "../items/game-item";
import { ItemDroppedJournalMessage } from "../journal-messages/item-thrown-journal-message";
import { PlayerAction } from "./player-action";


export class DropItemPlayerAction implements PlayerAction {

    constructor(private readonly item: GameItem) {  
    }

    public perform(game: Game): void {
        game.Player.Inventory.removeItem(this.item);
        game.Journal.write(game, new ItemDroppedJournalMessage(this.item));
    }
}
