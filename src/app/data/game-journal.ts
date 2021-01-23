import { LocalizationService } from "../services/game-localization/localization.service";
import { Game } from "./game";
import { GameJournalMessage } from "./journal-messages/game-journal-message";
import { GameJournalMemento } from "./mementos/game-journal-memento";
import { DatePipe } from '@angular/common';

export class GameJournal {
    private messages: string[];

    constructor(data: GameJournalMemento, private readonly localizationService: LocalizationService) {
        this.messages = data.messages;
    }

    private getTimeStamp(game: Game): string {
        const datepipe: DatePipe = new DatePipe('en-US')
        const format = this.localizationService.translate('environment.date-time-format') ?? 'MM/dd/yyyy hh:mm';
        return  datepipe.transform(game.Environment.Time, format) ?? game.Environment.Time.toString();
    }

    public write(game: Game, message: GameJournalMessage): void {
        const timeStamp = this.getTimeStamp(game);
        const messageText = `[${timeStamp}] ${message.getMessageString(this.localizationService)}`;
        this.messages.push(messageText);
    }

    public get Messages(): string[] {
        return this.messages;
    }

    public getMemento(): GameJournalMemento {
        return {
            messages: this.messages
        };
    }
}
