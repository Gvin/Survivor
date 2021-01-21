import { Component, Input } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Game } from "src/app/data/game";
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

    @Input()
    public game?: Game;

    constructor(private dialog: MatDialog) {
    }

    public openInventory(): void {
        if (!this.model) {
            throw Error('Model not initialized.');
        }
        if (!this.game) {
            throw Error('Game not initialized.')
        }

        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            inventory: this.model.Inventory,
            game: this.game
        };

        this.dialog.open(SurvivorPlayerInventoryComponent, dialogConfig);
    }
}
