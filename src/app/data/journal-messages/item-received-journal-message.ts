import { GameItem } from "../items/game-item";
import { LocalizableString } from "../localizable-string";
import { GameJournalMessage } from "./game-journal-message";

export class ItemReceivedJournalMessage implements GameJournalMessage {
    constructor(private readonly item: GameItem) {
    }
    
    public getMessageString(): LocalizableString {
        return new LocalizableString().addStatic('You have received ').addSubstring(this.item.Name).addStatic('.');
    }
}
