import { Component, Inject, OnInit } from "@angular/core";
import { MatButtonToggleChange } from "@angular/material/button-toggle";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { first } from "rxjs/operators";
import { SettingsManagerService, ThemesMode } from "src/app/services/config-provider/settings-manager.service";
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
export class SurvivorSettingsDialogComponent implements OnInit {
    private readonly dialogService: GameDialogsService;
    public currentThemeMode: string | undefined;

    public constructor(
        private readonly localizationService: LocalizationService,
        private readonly dialogRef: MatDialogRef<SurvivorSettingsDialogComponent>,
        private readonly settingsManager: SettingsManagerService,
        @Inject(MAT_DIALOG_DATA) data: SettingsDialogData) {

            this.dialogService = data.dialogService;
    }

    public ngOnInit(): void {
        this.settingsManager.getThemesMode().pipe(first()).subscribe(mode => {
            this.currentThemeMode = mode;
        })
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

    public themesModeChanged(event: MatButtonToggleChange): void {
        const themeMode = event.value as ThemesMode;
        this.settingsManager.setThemesMode(themeMode);
    }

    public close(): void {
        this.dialogRef.close();
    }
}
