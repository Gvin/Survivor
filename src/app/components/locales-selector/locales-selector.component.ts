import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { GameLocale, LocalizationService } from "src/app/services/game-localization/localization.service";

@Component({
    selector: 'srv-locales-selector',
    templateUrl: './locales-selector.component.html',
    styleUrls: [
        './locales-selector.component.scss',
        '../../../flag-icons.scss'
    ]
})
export class SurvivorLocalesSelectorComponent {
    public readonly locales: GameLocale[];
    
    constructor(
        private readonly localizationService: LocalizationService,
        private readonly dialogRef: MatDialogRef<SurvivorLocalesSelectorComponent>) {
            this.locales = this.localizationService.getExistingLocales();
    }

    public applyLocale(locale: GameLocale): void {
        this.localizationService.setLocale(locale);
        this.close();
        location.reload();
    }

    public close(): void {
        this.dialogRef.close();
    }
}
