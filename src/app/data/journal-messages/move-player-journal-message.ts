import { GameJournalMessage } from "./journal-message";

export class MovePlayerJournalMessage implements GameJournalMessage {

    constructor(
        private sourceLocationTitle: string, 
        private targetLocationTitle: string) {
    }
    
    public toString(): string {
        return `You walked from ${this.sourceLocationTitle} to ${this.targetLocationTitle}.`;
    }
}
