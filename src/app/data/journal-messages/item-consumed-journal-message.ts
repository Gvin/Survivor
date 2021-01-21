import { GameItem } from "../items/game-item";
import { GameJournalMessage } from "./game-journal-message";

export class ItemConsumedJournalMessage implements GameJournalMessage {

    constructor(private readonly item: GameItem) {
    }

    public getMessageString(): string {
        return `You have consumed ${this.item.Name}.`;
    }

}
