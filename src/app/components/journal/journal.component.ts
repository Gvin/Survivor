import { Component, Input } from "@angular/core";
import { GameJournal } from "src/app/data/game-journal";

@Component({
    selector: 'srv-journal',
    templateUrl: './journal.component.html',
    styleUrls: ['./journal.component.scss']
})
export class SurvivorJournalComponent {
    @Input()
    public model?: GameJournal;
    
}
