import { Game } from "./game";
import { GameJournalMessage } from "./journal-messages/journal-message";
import { GameJournalMemento } from "./mementos/game-journal-memento";

export class GameJournal {
    private messages: string[];

    constructor(data: GameJournalMemento) {
        this.messages = data.messages;
    }

    private getTimeStamp(game: Game): string {
        return  `${game.Environment.Time.toDateString()} ${game.Environment.Time.toTimeString()}`;
    }

    public write(game: Game, message: GameJournalMessage): void {
        const timeStamp = this.getTimeStamp(game);
        const messageText = `[${timeStamp}] ${message.toString()}`;
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
