import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Game } from "src/app/data/game";
import { GameInventoryStack, Inventory } from "src/app/data/inventory";
import { GameItem } from "src/app/data/items/game-item";
import { PickSearchItemsPlayerAction } from "src/app/data/player-actions/pick-search-items-player-action";
import { LocalizationService } from "src/app/services/game-localization/localization.service";

export interface SearchResultsDialogData {
    game: Game;
}

@Component({
    selector: 'srv-search-results-dialog',
    templateUrl: './search-results-dialog.component.html',
    styleUrls: ['./search-results-dialog.component.scss']
})
export class SurvivorSearchResultsDialogComponent {
    private readonly game: Game;
    public readonly inventory: Inventory;
    private readonly pickedItems: GameItem[];
    public selectedItem?: GameInventoryStack;
    
    public constructor(
        private readonly localizationService: LocalizationService,
        private readonly dialogRef: MatDialogRef<SurvivorSearchResultsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: SearchResultsDialogData) {

            this.game = data.game;
            this.inventory = new Inventory();

            if (!this.game.SearchResults) {
                throw Error('Search results are empty.');
            }
            this.game.SearchResults.forEach(result => {
                for (let counter = 0; counter < result.count; counter++) {
                    const item = this.game.ItemsFactory.createItem(result.itemId);
                    this.inventory.addItem(item);
                }
            });

            this.pickedItems = [];
    }

    public getItemNameWithCount(stack: GameInventoryStack): string {
        const itemName = this.localizationService.translateString(stack.TopItem.Name);
        if (stack.TopItem.Stackable) {
            return `${itemName} (${stack.Count})`;
        } else {
            return itemName;
        }
    }

    public getItemDescription(stack: GameInventoryStack): string {
        return this.localizationService.translateString(stack.TopItem.Description);
    }

    public pickUpItem(stack: GameInventoryStack): void {
        const item = stack.TopItem;
        this.inventory.removeItem(item);
        this.pickedItems.push(item);
        this.selectedItem = undefined;
    }

    public close(): void {
        this.game.performAction(new PickSearchItemsPlayerAction(this.pickedItems, this.inventory.getItems()));
        this.dialogRef.close();
    }

    public handleItemSelected(item?: GameInventoryStack) {
        this.selectedItem = item;
    }
}
