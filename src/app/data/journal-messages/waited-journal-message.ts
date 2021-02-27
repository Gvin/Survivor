import { LocaleNamespace } from "src/app/services/game-localization/localization.service";
import { LocalizableString } from "../localizable-string";
import { GameJournalMessage } from "./game-journal-message";

export class WaitedJournalMessage implements GameJournalMessage {
    public constructor(private readonly time: number) {
    }

    public getMessageString(): LocalizableString {
        return new LocalizableString().addLocalizable('waited', LocaleNamespace.journal, [this.time.toString()]);
    }
}
