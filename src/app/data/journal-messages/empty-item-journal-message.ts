import { GameItem } from "../items/game-item";
import { LocalizableString } from "../localizable-string";
import { GameJournalMessage } from "./game-journal-message";

export class EmptyItemJournalMessage implements GameJournalMessage {
    constructor(private readonly item: GameItem) {
    }

    public getMessageString(): LocalizableString {
        return new LocalizableString().addStatic('You have emptied ').addSubstring(this.item.Name).addStatic('.');
    }
}
