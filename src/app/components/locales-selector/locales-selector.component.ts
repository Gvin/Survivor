import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { GameLocale, LocalizationService } from "src/app/services/game-localization/localization.service";
import { PageRefreshService } from "src/app/services/page-refresh/page-refresh.service";

@Component({
    selector: 'srv-locales-selector',
    templateUrl: './locales-selector.component.html',
    styleUrls: [
        './locales-selector.component.scss',
        '../../../styles/flag-icons.scss'
    ]
})
export class SurvivorLocalesSelectorComponent {
    public readonly locales: GameLocale[];
    
    constructor(
        private readonly localizationService: LocalizationService,
        private readonly pageRefreshService: PageRefreshService,
        private readonly dialogRef: MatDialogRef<SurvivorLocalesSelectorComponent>) {
            this.locales = this.localizationService.getExistingLocales();
    }

    public applyLocale(locale: GameLocale): void {
        this.localizationService.setLocale(locale);
        this.close();
        this.pageRefreshService.refreshPage();
    }

    public close(): void {
        this.dialogRef.close();
    }
}
