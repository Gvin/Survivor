import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SurvivorCraftingDialogComponent } from "src/app/components/crafting-dialog/crafting-dialog.component";
import { SurvivorLocalesSelectorComponent } from "src/app/components/locales-selector/locales-selector.component";
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

    public showLocalesSelectorDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        this.dialog.open(SurvivorLocalesSelectorComponent, dialogConfig);
    }

    public showCraftingDialog(game: Game): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            game: game
        };

        this.dialog.open(SurvivorCraftingDialogComponent, dialogConfig);
    }
}
