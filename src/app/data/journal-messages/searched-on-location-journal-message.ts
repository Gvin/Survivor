import { LocaleNamespace } from "src/app/services/game-localization/localization.service";
import { LocalizableString } from "../localizable-string";
import { GameJournalMessage } from "./game-journal-message";

export class SearchOnLocationJournalMessage implements GameJournalMessage {
    public constructor(private readonly count: number) {
    }

    public getMessageString(): LocalizableString {
        return new LocalizableString().addLocalizable('search-on-location', LocaleNamespace.journal, [`${this.count}`]);
    }
}
