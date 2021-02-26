import { LocaleNamespace } from "src/app/services/game-localization/localization.service";
import { Game } from "../game";
import { GameItem } from "../items/game-item";
import { LocalizableString } from "../localizable-string";
import { GameJournalMessage } from "./game-journal-message";

export class ItemCraftedJournalMessage implements GameJournalMessage {
    public constructor(private readonly itemId: string, private readonly count: number) {
    }

    public getMessageString(): LocalizableString {
        if (this.count === 1) {
            return new LocalizableString().addLocalizableComposite('item-crafted-single', LocaleNamespace.journal, [
                GameItem.getUseName(this.itemId)
            ]);
        }

        return new LocalizableString().addLocalizableComposite('item-crafted-multi', LocaleNamespace.journal, [
            GameItem.getMultiName(this.itemId)
        ]);
    }

    private getItemName(): LocalizableString {
        if (this.count === 1) {
            return GameItem.getUseName(this.itemId);
        }

        return GameItem.getMultiName(this.itemId);
    }
}
