import { LocaleNamespace } from "src/app/services/game-localization/localization.service";
import { LocalizableString } from "../localizable-string";
import { GameJournalMessage } from "./game-journal-message";

export class SearchOnLocationJournalMessage implements GameJournalMessage {
    public constructor(private readonly count: number) {
    }

    public getMessageString(): LocalizableString {
        return new LocalizableString().addLocalizable(this.getLocalizationKey(), LocaleNamespace.journal, [`${this.count}`]);
    }

    private getLocalizationKey(): string {
        if (this.count === 0) {
            return 'search-on-location.none';
        }
        if (this.count === 1) {
            return 'search-on-location.single';
        }
        return 'search-on-location.multi';
    }
}
