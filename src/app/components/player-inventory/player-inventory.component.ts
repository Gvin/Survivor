import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inventory } from "src/app/data/inventory";
import { GameItem } from "src/app/data/items/game-item";

@Component({
    selector: 'srv-player-inventory',
    templateUrl: './player-inventory.component.html',
    styleUrls: [
        './player-inventory.component.scss',
        '../../../item-icons.scss'
    ]
})
export class SurvivorPlayerInventoryComponent {
    private inventory: Inventory;
    public selectedItem?: GameItem;

    constructor(
        private dialogRef: MatDialogRef<SurvivorPlayerInventoryComponent>,
        @Inject(MAT_DIALOG_DATA) data: any) {
            this.inventory = data.inventory;
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

    public close(): void {
        this.dialogRef.close(null);
    }
}
