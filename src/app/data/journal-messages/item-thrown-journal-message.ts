import { GameItem } from "../items/game-item";
import { GameJournalMessage } from "./game-journal-message";

export class ItemThrownJournalMessage implements GameJournalMessage {
    constructor(private readonly item: GameItem) {
    }
    
    public getMessageString(): string {
        return `You have thrown away ${this.item.Name}.`;
    }
}
