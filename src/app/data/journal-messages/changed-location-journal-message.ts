import { LocaleNamespace } from "src/app/services/game-localization/localization.service";
import { GameLocation } from "../game-location";
import { LocalizableString } from "../localizable-string";
import { GameJournalMessage } from "./game-journal-message";

export class ChangedLocationJournalMessage implements GameJournalMessage {

    constructor(
        private readonly sourceLocation: GameLocation, 
        private readonly targetLocation: GameLocation) {
    }
    
    public getMessageString(): LocalizableString {
        return new LocalizableString().addLocalizableComposite('changed-location', LocaleNamespace.journal, [
            this.sourceLocation.FromName,
            this.targetLocation.ToName
        ]);
    }
}
