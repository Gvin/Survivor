import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Game } from "src/app/data/game";
import { GameInventoryStack, Inventory } from "src/app/data/inventory";
import { LocalizableString } from "src/app/data/localizable-string";
import { PickUpItemsPlayerAction } from "src/app/data/player-actions/pick-up-items-player-action";
import { LocalizationService } from "src/app/services/game-localization/localization.service";

@Component({
    selector: 'srv-storage-inventory',
    templateUrl: './storage-inventory.component.html',
    styleUrls: ['./storage-inventory.component.scss']
})
export class SurvivorStorageInventoryComponent {
    private readonly game: Game;
    public readonly inventory: Inventory;
    private readonly title: LocalizableString;
    public selectedItem?: GameInventoryStack;

    constructor(
        private readonly localizationService: LocalizationService,
        private dialogRef: MatDialogRef<SurvivorStorageInventoryComponent>,
        @Inject(MAT_DIALOG_DATA) data: any) {

        this.inventory = data.inventory;
        this.game = data.game;
        this.title = data.title;
        if (!this.inventory) {
            throw Error('Inventory not provided.');
        }
        if (!this.game) {
            throw Error('Game not provided.');
        }
        if (!this.title) {
            throw Error('Title not provided.');
        }

        this.selectedItem = undefined;
    }

    public getTitle(): string {
        return this.localizationService.translateString(this.title);
    }
    
    public close(): void {
        this.dialogRef.close(null);
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

    public puckUpItem(stack: GameInventoryStack): void {
        this.game.performAction(new PickUpItemsPlayerAction([stack.TopItem]));
        this.selectedItem = undefined;
    }

    public handleItemSelected(item?: GameInventoryStack) {
        this.selectedItem = item;
    }
}
