import { LocalizableString } from "../localizable-string";
import { GameJournalMessage } from "./game-journal-message";

export class DrinkOnLocationJournalMessage implements GameJournalMessage {
    public getMessageString(): LocalizableString {
        return new LocalizableString().addStatic('You have drank some water from the water source.');
    }
}
