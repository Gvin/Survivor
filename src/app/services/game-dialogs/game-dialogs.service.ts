import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CraftingDialogData, SurvivorCraftingDialogComponent } from "src/app/components/crafting-dialog/crafting-dialog.component";
import { SurvivorLocalesSelectorDialogComponent } from "src/app/components/locales-selector-dialog/locales-selector-dialog.component";
import { PlayerInventoryDialogData, SurvivorPlayerInventoryDialogComponent } from "src/app/components/player-inventory-dialog/player-inventory-dialog.component";
import { StorageInventoryDialogData, SurvivorStorageInventoryDialogComponent } from "src/app/components/storage-inventory-dialog/storage-inventory-dialog.component";
import { SurvivorWaitDialogComponent, WaitDialogResult } from "src/app/components/wait-dialog/wait-dialog.component";
import { Game } from "src/app/data/game";
import { Inventory } from "src/app/data/inventory";
import { LocalizableString } from "src/app/data/localizable-string";
import { first, map } from "rxjs/operators";
import { SettingsDialogData, SurvivorSettingsDialogComponent } from "src/app/components/settings-dialog/settings-dialog.component";
import { Observable } from "rxjs";
import { SearchResultsDialogData, SurvivorSearchResultsDialogComponent } from "src/app/components/search-results-dialog/search-results-dialog.component";

@Injectable({providedIn: 'root'})
export class GameDialogsService {
    constructor(private readonly dialog: MatDialog) {
    }

    public showPlayerInventoryDialog(game: Game): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        const data: PlayerInventoryDialogData = {
            game: game
        };
        dialogConfig.data = data;

        this.dialog.open(SurvivorPlayerInventoryDialogComponent, dialogConfig);
    }

    public showStorageInventoryDialog(game: Game, inventory: Inventory, title: LocalizableString): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        const data: StorageInventoryDialogData = {
            inventory: inventory,
            game: game,
            title: title
        }
        dialogConfig.data = data;

        this.dialog.open(SurvivorStorageInventoryDialogComponent, dialogConfig);
    }

    public showLocalesSelectorDialog(): Observable<boolean> {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        return this.dialog.open(SurvivorLocalesSelectorDialogComponent, dialogConfig).afterClosed().pipe(
            first(),
            map((changed: boolean) => {
                return changed;
            })
        );
    }

    public showCraftingDialog(game: Game): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        const data: CraftingDialogData = {
            game: game
        };
        dialogConfig.data = data;

        this.dialog.open(SurvivorCraftingDialogComponent, dialogConfig);
    }

    public showWaitDialog(): Observable<WaitDialogResult> {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        return this.dialog.open(SurvivorWaitDialogComponent, dialogConfig).afterClosed().pipe(
            first(),
            map((result: WaitDialogResult) => {
                return result;
            })
        );
    }

    public showSettingsDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        const data: SettingsDialogData = {
            dialogService: this
        };
        dialogConfig.data = data;
        this.dialog.open(SurvivorSettingsDialogComponent, dialogConfig);
    }

    public showSearchResultsDialog(game: Game): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;

        const data: SearchResultsDialogData = {
            game: game
        };
        dialogConfig.data = data;
        this.dialog.open(SurvivorSearchResultsDialogComponent, dialogConfig);
    }
}
