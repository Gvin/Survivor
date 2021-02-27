import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Game } from "src/app/data/game";
import { GameInventoryStack, Inventory } from "src/app/data/inventory";
import { GameItemExtraAction } from "src/app/data/items/game-item";
import { DropItemPlayerAction } from "src/app/data/player-actions/drop-item-player-action";
import { LocalizationService } from "src/app/services/game-localization/localization.service";

@Component({
    selector: 'srv-player-inventory-dialog',
    templateUrl: './player-inventory-dialog.component.html',
    styleUrls: ['./player-inventory-dialog.component.scss']
})
export class SurvivorPlayerInventoryDialogComponent {
    private readonly game: Game;
    public readonly inventory: Inventory;
    public selectedItem?: GameInventoryStack;

    constructor(
        private readonly localizationService: LocalizationService,
        private dialogRef: MatDialogRef<SurvivorPlayerInventoryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: any) {

        this.inventory = data.inventory;
        this.game = data.game;
        if (!this.inventory) {
            throw Error('Inventory not provided.');
        }
        if (!this.game) {
            throw Error('Game not provided.');
        }

        this.selectedItem = undefined;
    }

    public handleItemSelected(item?: GameInventoryStack) {
        this.selectedItem = item;
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

    public getItemExtraActions(stack: GameInventoryStack): GameItemExtraAction[] {
        return stack.TopItem.getExtraActions();
    }

    public getExtraActionName(action: GameItemExtraAction): string {
        return this.localizationService.translateString(action.title);
    }

    public getExtraActionTooltip(action: GameItemExtraAction): string {
        return this.localizationService.translateString(action.tooltip);
    }

    public callItemExtraAction(itemAction: GameItemExtraAction): void {
        const keepSelection = itemAction.action(this.game);
        if (!keepSelection) {
            this.selectedItem = undefined;
        }
    }

    public dropItem(item: GameInventoryStack): void {
        this.game.performAction(new DropItemPlayerAction(item.TopItem));
        this.selectedItem = undefined;
    }

    public close(): void {
        this.dialogRef.close(null);
    }
}
