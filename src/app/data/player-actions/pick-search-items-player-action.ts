import { Game } from "../game";
import { GameItem } from "../items/game-item";
import { ItemPickedUpJournalMessage } from "../journal-messages/item-picked-up-journal-message";
import { PlayerAction } from "./player-action";

export class PickSearchItemsPlayerAction implements PlayerAction {
    public constructor(
        private readonly pickedItems: GameItem[], 
        private readonly leftItems: GameItem[]
        ) {
    }

    public perform(game: Game): void {
        this.pickedItems.forEach(item => {
            game.Player.Inventory.addItem(item);
            game.Journal.write(game, new ItemPickedUpJournalMessage(item));
        });

        this.leftItems.forEach(item => {
            game.CurrentLocation.GroundInventory.addItem(item);
        });
        
        game.SearchResults = undefined;
    }
}
