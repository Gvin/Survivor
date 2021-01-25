import { LocaleNamespace, LocalizationService } from "src/app/services/game-localization/localization.service";
import { GameLocationId } from "../mementos/game-location-memento";
import { GameJournalMessage } from "./game-journal-message";

export class ChangedLocationJournalMessage implements GameJournalMessage {

    constructor(
        private readonly sourceLocationId: GameLocationId, 
        private readonly targetLocationId: GameLocationId) {
    }
    
    public getMessageString(localizationService: LocalizationService): string {
        const sourceLocationTitle = localizationService.translate(`${this.sourceLocationId}.title`, LocaleNamespace.locations);
        const targetLocationTitle = localizationService.translate(`${this.targetLocationId}.title`, LocaleNamespace.locations);
        return `You walked from ${sourceLocationTitle} to ${targetLocationTitle}.`;
    }
}
