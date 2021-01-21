import { GameJournalMessage } from "./game-journal-message";

export class MovePlayerJournalMessage implements GameJournalMessage {

    constructor(
        private sourceLocationTitle: string, 
        private targetLocationTitle: string) {
    }
    
    public getMessageString(): string {
        return `You walked from ${this.sourceLocationTitle} to ${this.targetLocationTitle}.`;
    }
}
