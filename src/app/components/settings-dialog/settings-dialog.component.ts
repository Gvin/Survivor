import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { GameDialogsService } from "src/app/services/game-dialogs/game-dialogs.service";
import { GameLocale, LocalizationService } from "src/app/services/game-localization/localization.service";

export interface SettingsDialogData {
    dialogService: GameDialogsService;
}

@Component({
    selector: 'srv-settings-dialog',
    templateUrl: './settings-dialog.component.html',
    styleUrls: [
        './settings-dialog.component.scss',
        '../../../styles/flag-icons.scss'
    ]
})
export class SurvivorSettingsDialogComponent {
    private readonly dialogService: GameDialogsService;

    public constructor(
        private readonly localizationService: LocalizationService,
        private readonly dialogRef: MatDialogRef<SurvivorSettingsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: SettingsDialogData) {

            this.dialogService = data.dialogService;
    }

    public changeLocale(): void {
        this.dialogService.showLocalesSelectorDialog().subscribe(changed => {
            if (changed) {
                this.close();
            }
        });
    }

    public get currentLocale(): GameLocale {
        return this.localizationService.currentLocale;
    }

    public close(): void {
        this.dialogRef.close();
    }
}
