import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SurvivorCraftingDialogComponent } from "src/app/components/crafting-dialog/crafting-dialog.component";
import { SurvivorLocalesSelectorDialogComponent } from "src/app/components/locales-selector-dialog/locales-selector-dialog.component";
import { SurvivorPlayerInventoryDialogComponent } from "src/app/components/player-inventory-dialog/player-inventory-dialog.component";
import { SurvivorStorageInventoryDialogComponent } from "src/app/components/storage-inventory-dialog/storage-inventory-dialog.component";
import { SurvivorWaitDialogComponent } from "src/app/components/wait-dialog/wait-dialog.component";
import { Game } from "src/app/data/game";
import { Inventory } from "src/app/data/inventory";
import { LocalizableString } from "src/app/data/localizable-string";
import { first } from "rxjs/operators";

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

        this.dialog.open(SurvivorPlayerInventoryDialogComponent, dialogConfig);
    }

    public showStorageInventoryDialog(game: Game, inventory: Inventory, title: LocalizableString): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            inventory: inventory,
            game: game,
            title: title
        };

        this.dialog.open(SurvivorStorageInventoryDialogComponent, dialogConfig);
    }

    public showLocalesSelectorDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        this.dialog.open(SurvivorLocalesSelectorDialogComponent, dialogConfig);
    }

    public showCraftingDialog(game: Game): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            game: game
        };

        this.dialog.open(SurvivorCraftingDialogComponent, dialogConfig);
    }

    public showWaitDialog(callback: (time: number) => void): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        this.dialog.open(SurvivorWaitDialogComponent, dialogConfig).afterClosed().pipe(first()).subscribe(time => {
            if (time != null) {
                callback(time);
            }
        });
    }
}
