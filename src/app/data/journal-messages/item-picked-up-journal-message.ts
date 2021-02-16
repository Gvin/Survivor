import { LocaleNamespace } from "src/app/services/game-localization/localization.service";
import { GameItem } from "../items/game-item";
import { LocalizableString } from "../localizable-string";
import { GameJournalMessage } from "./game-journal-message";

export class ItemPickedUpJournalMessage implements GameJournalMessage {
    constructor(private readonly item: GameItem) {
    }
    
    public getMessageString(): LocalizableString {
        return new LocalizableString().addLocalizableComposite('item-picked-up', LocaleNamespace.journal, [this.item.Name]);
    }
}
