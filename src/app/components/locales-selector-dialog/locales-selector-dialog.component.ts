import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { GameLocale, LocalizationService } from "src/app/services/game-localization/localization.service";
import { PageRefreshService } from "src/app/services/page-refresh/page-refresh.service";

@Component({
    selector: 'srv-locales-selector-dialog',
    templateUrl: './locales-selector-dialog.component.html',
    styleUrls: [
        './locales-selector-dialog.component.scss',
        '../../../styles/flag-icons.scss'
    ]
})
export class SurvivorLocalesSelectorDialogComponent {
    public readonly locales: GameLocale[];
    
    constructor(
        private readonly localizationService: LocalizationService,
        private readonly pageRefreshService: PageRefreshService,
        private readonly dialogRef: MatDialogRef<SurvivorLocalesSelectorDialogComponent>) {
            this.locales = this.localizationService.getExistingLocales();
    }

    public applyLocale(locale: GameLocale): void {
        this.localizationService.setLocale(locale);
        this.dialogRef.close(true);
        this.pageRefreshService.refreshPage();
    }

    public close(): void {
        this.dialogRef.close(false);
    }
}
