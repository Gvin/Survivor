import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Game } from "src/app/data/game";
import { GameInventoryStack, Inventory } from "src/app/data/inventory";
import { GameItemExtraAction } from "src/app/data/items/game-item";
import { DropItemPlayerAction } from "src/app/data/player-actions/drop-item-player-action";
import { LocalizationService } from "src/app/services/game-localization/localization.service";

@Component({
    selector: 'srv-player-inventory',
    templateUrl: './player-inventory.component.html',
    styleUrls: [
        './player-inventory.component.scss',
        '../../../item-icons.scss'
    ]
})
export class SurvivorPlayerInventoryComponent {
    private readonly game: Game;
    private readonly inventory: Inventory;
    public selectedItem?: GameInventoryStack;

    constructor(
        private readonly localizationService: LocalizationService,
        private dialogRef: MatDialogRef<SurvivorPlayerInventoryComponent>,
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

    public getItems(): GameInventoryStack[] {
        return this.inventory.Stacks;
    }

    public getItemName(stack: GameInventoryStack): string {
        return this.localizationService.translateString(stack.TopItem.Name);
    }

    public getItemNameWithCount(stack: GameInventoryStack): string {
        const itemName = this.getItemName(stack);
        if (stack.TopItem.Stackable) {
            return `${itemName} (${stack.Count})`;
        } else {
            return itemName;
        }
    }

    public getItemDescription(stack: GameInventoryStack): string {
        return this.localizationService.translateString(stack.TopItem.Description);
    }

    public selectItem(item: GameInventoryStack): void {
        if (this.selectedItem === item) {
            this.selectedItem = undefined;
        } else {
            this.selectedItem = item;
        }
    }

    public isItemSelected(item: GameInventoryStack): boolean {
        return this.selectedItem === item;
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
