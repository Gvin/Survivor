import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SurvivorPlayerInventoryComponent } from "../../components/player-inventory/player-inventory.component";
import { SurvivorStorageInventoryComponent } from "../../components/storage-inventory/storage-inventory.component";
import { Game } from "../../data/game";
import { Inventory } from "../../data/inventory";
import { LocalizableString } from "../../data/localizable-string";

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
