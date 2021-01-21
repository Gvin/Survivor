import { Component, Input } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Player } from "src/app/data/player";
import { SurvivorPlayerInventoryComponent } from "../player-inventory/player-inventory.component";

@Component({
    selector: 'srv-player-stats',
    templateUrl: './player-stats.component.html',
    styleUrls: ['./player-stats.component.scss']
})
export class SurvivorPlayerStatsComponent {
    @Input()
    public model?: Player;

    constructor(private dialog: MatDialog) {
    }

    public openInventory(): void {
        if (!this.model) {
            throw Error('Model not initialized.');
        }

        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            inventory: this.model.Inventory
        };

        this.dialog.open(SurvivorPlayerInventoryComponent, dialogConfig);
    }
}
