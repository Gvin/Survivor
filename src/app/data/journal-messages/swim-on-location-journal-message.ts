import { LocalizableString } from "../localizable-string";
import { GameJournalMessage } from "./game-journal-message";

export class SwimOnLocationJournalMessage implements GameJournalMessage {
    public getMessageString(): LocalizableString {
        return new LocalizableString().addStatic('You swam in the water.');
    }
}
