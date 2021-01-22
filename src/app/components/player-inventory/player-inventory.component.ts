import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Game } from "src/app/data/game";
import { Inventory } from "src/app/data/inventory";
import { GameItem, GameItemExtraAction } from "src/app/data/items/game-item";
import { ConsumeItemPlayerAction } from "src/app/data/player-actions/consume-item-player-action";
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
    public selectedItem?: GameItem;

    constructor(
        private dialogRef: MatDialogRef<SurvivorPlayerInventoryComponent>,
        @Inject(MAT_DIALOG_DATA) data: any) {

        this.inventory = data.inventory;
        this.game = data.game;
        this.selectedItem = undefined;
    }

    public getItems(): GameItem[] {
        return this.inventory.Items;
    }

    public selectItem(item: GameItem): void {
        if (this.selectedItem === item) {
            this.selectedItem = undefined;
        } else {
            this.selectedItem = item;
        }
    }

    public isItemSelected(item: GameItem): boolean {
        return item === this.selectedItem;
    }

    public getItemExtraActions(item: GameItem): GameItemExtraAction[] {
        return item.getExtraActions();
    }

    public callItemExtraAction(itemAction: GameItemExtraAction): void {
        const dropSelection = itemAction.action(this.game);
        if (dropSelection) {
            this.selectedItem = undefined;
        }
    }

    public throwItem(item: GameItem): void {
        this.game.performAction(new ThrowItemPlayerAction(item));
        this.selectedItem = undefined;
    }

    public close(): void {
        this.dialogRef.close(null);
    }
}
