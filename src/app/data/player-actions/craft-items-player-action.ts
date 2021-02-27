import { Game } from "../game";
import { ItemCraftedJournalMessage } from "../journal-messages/item-crafted-journal-message";
import { GameRecipeMemento } from "../mementos/game-recipe-memento";
import { PlayerAction } from "./player-action";

export class CraftItemPlayerAction implements PlayerAction {
    public constructor(private readonly recipe: GameRecipeMemento) {
    }

    public perform(game: Game): void {
        this.recipe.parts.filter(part => part.consumed).forEach(part => {
            for (let counter = 0; counter < part.count; counter++) {
                game.Player.Inventory.removeItemById(part.itemId);
            }
        });

        for (let counter = 0; counter < this.recipe.outputCount; counter++) {
            const item = game.ItemsFactory.createItem(this.recipe.outputItemId);
            game.Player.Inventory.addItem(item);
        }
        
        game.processTimePassed(this.recipe.time);
        game.Journal.write(game, new ItemCraftedJournalMessage(this.recipe.outputItemId, this.recipe.outputCount));
    }
}
