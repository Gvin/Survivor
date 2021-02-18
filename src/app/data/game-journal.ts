import { Game } from "./game";
import { GameJournalMessage } from "./journal-messages/game-journal-message";
import { GameJournalMemento } from "./mementos/game-journal-memento";
import { LocalizableString } from "./localizable-string";

export interface GameJournalMessageRecord {
    timeStamp: Date;
    message: LocalizableString;
}

export class GameJournal {
    private messages: GameJournalMessageRecord[];

    constructor(memento: GameJournalMemento) {
        this.messages = [];
    }
    
    public write(game: Game, message: GameJournalMessage): void {
        const timeStamp = game.Environment.Time;
        const messageLocalizableString = message.getMessageString();
        this.messages.push({
            timeStamp: timeStamp,
            message: messageLocalizableString
        });
    }

    public get Messages(): GameJournalMessageRecord[] {
        return this.messages;
    }

    public getMemento(): GameJournalMemento {
        return {
        };
    }
}
