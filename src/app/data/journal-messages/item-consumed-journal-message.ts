import { LocaleNamespace, LocalizationService } from "src/app/services/game-localization/localization.service";
import { GameItem } from "../items/game-item";
import { GameJournalMessage } from "./game-journal-message";

export class ItemConsumedJournalMessage implements GameJournalMessage {

    constructor(private readonly item: GameItem) {
    }

    public getMessageString(localizationService: LocalizationService): string {
        return `You have consumed ${localizationService.translate(`${this.item.Id}.name`, LocaleNamespace.items)}.`;
    }

}
