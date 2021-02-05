import { LocalizationService } from "src/app/services/game-localization/localization.service";
import { LocalizableString } from "../localizable-string";

export interface GameJournalMessage {
    getMessageString(): LocalizableString;
}
