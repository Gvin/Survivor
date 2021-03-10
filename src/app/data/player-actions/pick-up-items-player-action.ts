import { Game } from "../game";
import { GameItem } from "../items/game-item";
import { ItemPickedUpJournalMessage } from "../journal-messages/item-picked-up-journal-message";
import { PlayerAction } from "./player-action";

export class PickUpItemsPlayerAction implements PlayerAction {
    constructor(private readonly items: GameItem[]) {
    }

    public perform(game: Game): void {
        this.items.forEach(item => {
            game.CurrentLocation.GroundInventory.removeItem(item);
            game.Player.Inventory.addItem(item);
            game.Journal.write(game, new ItemPickedUpJournalMessage(item));
        });
    }
}
