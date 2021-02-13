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
            .addStatic('You walked from the ').addSubstring(this.sourceLocation.FromName).addStatic(' to the ').addSubstring(this.targetLocation.ToName).addStatic('.');
    }
}
