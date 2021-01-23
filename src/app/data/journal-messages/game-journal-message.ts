import { LocalizationService } from "src/app/services/game-localization/localization.service";

export interface GameJournalMessage {
    getMessageString(localizationService: LocalizationService): string;
}
