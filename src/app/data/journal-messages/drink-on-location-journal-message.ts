import { LocaleNamespace } from "src/app/services/game-localization/localization.service";
import { LocalizableString } from "../localizable-string";
import { GameJournalMessage } from "./game-journal-message";

export class DrinkOnLocationJournalMessage implements GameJournalMessage {
    public getMessageString(): LocalizableString {
        return new LocalizableString().addLocalizable('drink-on-location', LocaleNamespace.journal);
    }
}
