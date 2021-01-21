import { Game } from "../game";
import { MovePlayerJournalMessage } from "../journal-messages/move-player-journal-message";
import { PlayerAction } from "./player-action";

export class MovePlayerAction implements PlayerAction {

    constructor(
        private sourceLocationId: string,
        private targetLocationId: string, 
        private walkTime: number) {
    }

    public perform(game: Game): number {
        const sourceLocation = game.Map.getLocation(this.sourceLocationId);
        const targetLocation = game.Map.getLocation(this.targetLocationId);

        game.movePlayer(this.targetLocationId);
        game.Journal.write(game, new MovePlayerJournalMessage(sourceLocation.Title, targetLocation.Title));
        return this.walkTime;
    }
}
