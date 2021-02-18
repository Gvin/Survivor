import { DatePipe } from "@angular/common";
import { AfterViewInit, Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { GameJournal } from "src/app/data/game-journal";
import { LocalizationService } from "src/app/services/game-localization/localization.service";

@Component({
    selector: 'srv-journal',
    templateUrl: './journal.component.html',
    styleUrls: ['./journal.component.scss']
})
export class SurvivorJournalComponent implements AfterViewInit {

    @ViewChild('journalBox', {static: false}) journalBox?: ElementRef;
    @ViewChildren('journalMessage') messageElements?: QueryList<any>;

    @Input()
    public model?: GameJournal;

    private scrollContainer: any;
    private isNearBottom: boolean;

    public constructor(private readonly localizationService: LocalizationService) {
        this.isNearBottom = true;
    }

    public ngAfterViewInit(): void {
        if (!this.journalBox || !this.messageElements) {
            throw new Error('Journal box was not initialized.');
        }

        this.scrollContainer = this.journalBox.nativeElement;  
        this.messageElements.changes.subscribe(_ => this.onItemElementsChanged());  
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

    private onItemElementsChanged(): void {
        if (this.isNearBottom) {
            this.scrollToBottom();
        }
    }
    
    private scrollToBottom(): void {
        this.scrollContainer.scroll({
            top: this.scrollContainer.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });
    }

    public scrolled(event: any): void {
        this.isNearBottom = this.isUserNearBottom();
    }

    private isUserNearBottom(): boolean {
        const threshold = 150;
        const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
        const height = this.scrollContainer.scrollHeight;
        return position > height - threshold;
    }
}
