import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Game } from "src/app/data/game";
import { GameInventoryStack, Inventory } from "src/app/data/inventory";
import {  GameItemExtraAction } from "src/app/data/items/game-item";
import { ThrowItemPlayerAction } from "src/app/data/player-actions/throw-item-player-action";

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
        private dialogRef: MatDialogRef<SurvivorPlayerInventoryComponent>,
        @Inject(MAT_DIALOG_DATA) data: any) {

        this.inventory = data.inventory;
        this.game = data.game;
        this.selectedItem = undefined;
    }

    public getItems(): GameInventoryStack[] {
        return this.inventory.Stacks;
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

    public getItemExtraActions(item: GameInventoryStack): GameItemExtraAction[] {
        return item.TopItem.getExtraActions();
    }

    public callItemExtraAction(itemAction: GameItemExtraAction): void {
        const dropSelection = itemAction.action(this.game);
        if (dropSelection) {
            this.selectedItem = undefined;
        }
    }

    public throwItem(item: GameInventoryStack): void {
        this.game.performAction(new ThrowItemPlayerAction(item.TopItem));
        this.selectedItem = undefined;
    }

    public close(): void {
        this.dialogRef.close(null);
    }
}
