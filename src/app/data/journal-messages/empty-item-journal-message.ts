import { GameItem } from "../items/game-item";
import { GameJournalMessage } from "./game-journal-message";

export class EmptyItemJournalMessage implements GameJournalMessage {
    constructor(private readonly item: GameItem) {
    }

    public getMessageString(): string {
        return `You have emptied ${this.item.Name}.`;
    }
}
