import { Game } from "../game";
import { ConsumableGameItem } from "../items/consumable-game-item";
import { ItemConsumedJournalMessage } from "../journal-messages/item-consumed-journal-message";
import { ItemReceivedJournalMessage } from "../journal-messages/item-received-journal-message";
import { PlayerAction } from "./player-action";

export class ConsumeItemPlayerAction implements PlayerAction {
    public constructor(private readonly item: ConsumableGameItem) {
    }

    public perform(game: Game): void {
        game.Player.Inventory.removeItem(this.item);
        game.Journal.write(game, new ItemConsumedJournalMessage(this.item));
        game.processTimePassed(this.item.ConsumeTime);
        this.item.applyEffect(game.Player);
        const leftItems = this.item.ConsumedLeft.map(itemId => game.ItemsFactory.createItem(itemId));
        leftItems.forEach(left => {
            game.Player.Inventory.addItem(left);
            game.Journal.write(game, new ItemReceivedJournalMessage(left));
        });
    }
}
