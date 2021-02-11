import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SurvivorPlayerInventoryComponent } from "src/app/components/player-inventory/player-inventory.component";
import { SurvivorStorageInventoryComponent } from "src/app/components/storage-inventory/storage-inventory.component";
import { Game } from "src/app/data/game";
import { Inventory } from "src/app/data/inventory";
import { LocalizableString } from "src/app/data/localizable-string";

@Injectable({providedIn: 'root'})
export class GameDialogsService {
    constructor(private readonly dialog: MatDialog) {
    }

    public showPlayerInventoryDialog(game: Game, inventory: Inventory): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            inventory: inventory,
            game: game
        };

        this.dialog.open(SurvivorPlayerInventoryComponent, dialogConfig);
    }

    public showStorageInventoryDialog(game: Game, inventory: Inventory, title: LocalizableString): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            inventory: inventory,
            game: game,
            title: title
        };

        this.dialog.open(SurvivorStorageInventoryComponent, dialogConfig);
    }
}
