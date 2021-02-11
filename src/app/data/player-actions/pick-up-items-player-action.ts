import { Game } from "../game";
import { GameItem } from "../items/game-item";
import { ItemPickedUpJournalMessage } from "../journal-messages/item-picked-up-journal-message";
import { PlayerAction } from "./player-action";

export class PickUpItemsPlayerAction implements PlayerAction {
    constructor(private readonly items: GameItem[]) {
    }

    public perform(game: Game): void {
        const currentLocation = game.Map.getLocation(game.CurrentLocation);
        this.items.forEach(item => {
            currentLocation.GroundInventory.removeItem(item);
            game.Player.Inventory.addItem(item);
            game.Journal.write(game, new ItemPickedUpJournalMessage(item));
        });
    }
}
