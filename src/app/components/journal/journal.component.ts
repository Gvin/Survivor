import { DatePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { GameJournal } from "src/app/data/game-journal";
import { LocalizationService } from "src/app/services/game-localization/localization.service";

@Component({
    selector: 'srv-journal',
    templateUrl: './journal.component.html',
    styleUrls: ['./journal.component.scss']
})
export class SurvivorJournalComponent {
    @Input()
    public model?: GameJournal;

    public constructor(private readonly localizationService: LocalizationService) {
    }
    
    private getTimeStamp(timeStamp: Date): string {
        const datepipe: DatePipe = new DatePipe('en-US')
        const format = this.localizationService.translate('environment.date-time-format') ?? 'MM/dd/yyyy hh:mm';
        return  datepipe.transform(timeStamp, format) ?? timeStamp.toString();
    }

    public getMessages(): string[] {
        return this.model?.Messages.map(record => {
            const timeStamp = this.getTimeStamp(record.timeStamp);
            const message = this.localizationService.translateString(record.message);
            return `[${timeStamp}] ${message}`;
        }) ?? [];
    }
}
