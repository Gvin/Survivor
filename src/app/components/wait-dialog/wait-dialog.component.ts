import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { LocaleNamespace, LocalizationService } from "src/app/services/game-localization/localization.service";

@Component({
    selector: 'srv-wait-dialog',
    templateUrl: './wait-dialog.component.html',
    styleUrls: ['./wait-dialog.component.scss']
})
export class SurvivorWaitDialogComponent {
    public selectedTime: number;

    public constructor(
        private readonly dialogRef: MatDialogRef<SurvivorWaitDialogComponent>,
        private readonly localizationService: LocalizationService
        ) {
        this.selectedTime = 10;
    }

    public getSelectedTime(): string {
        return this.localizationService.translate('wait.time', LocaleNamespace.common, undefined, [this.selectedTime.toString()])
    }

    public confirm(): void {
        this.dialogRef.close(this.selectedTime);
    }

    public close(): void {
        this.dialogRef.close();
    }
}
