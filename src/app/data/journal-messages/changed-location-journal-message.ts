import { GameLocation } from "../game-location";
import { LocalizableString } from "../localizable-string";
import { GameJournalMessage } from "./game-journal-message";

export class ChangedLocationJournalMessage implements GameJournalMessage {

    constructor(
        private readonly sourceLocation: GameLocation, 
        private readonly targetLocation: GameLocation) {
    }
    
    public getMessageString(): LocalizableString {
        return new LocalizableString()
            .addStatic('You walked from ').addSubstring(this.sourceLocation.Title).addStatic(' to ').addSubstring(this.targetLocation.Title).addStatic('.');
    }
}
