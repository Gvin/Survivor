import { LocaleNamespace } from "src/app/services/game-localization/localization.service";
import { GameLocationNameProvider } from "../game-location-name-provider";
import { LocalizableString } from "../localizable-string";
import { GameLocationId } from "../mementos/game-location-memento";
import { GameJournalMessage } from "./game-journal-message";

export class LocationUnlockedJournalMessage implements GameJournalMessage {
    public constructor(private readonly locationId: GameLocationId) {
    }
    
    public getMessageString(): LocalizableString {
        return new LocalizableString().addLocalizableComposite('location-unlocked', LocaleNamespace.journal, [GameLocationNameProvider.getTitle(this.locationId)]);
    }
}
