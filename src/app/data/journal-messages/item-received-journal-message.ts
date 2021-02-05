import { LocaleNamespace } from "src/app/services/game-localization/localization.service";
import { GameItem } from "../items/game-item";
import { LocalizableString } from "../localizable-string";
import { GameJournalMessage } from "./game-journal-message";

export class ItemReceivedJournalMessage implements GameJournalMessage {
    constructor(private readonly item: GameItem) {
    }
    
    public getMessageString(): LocalizableString {
        return new LocalizableString().addStatic('You have received ').addLocalizable(`${this.item.Id}.name`, LocaleNamespace.items).addStatic('.');
    }
}
