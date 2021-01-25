import { Game } from "../game";
import { ChangedLocationJournalMessage } from "../journal-messages/changed-location-journal-message";
import { GameLocationId } from "../mementos/game-location-memento";
import { PlayerAction } from "./player-action";

export class ChangeLocationPlayerAction implements PlayerAction {
    constructor(
        private readonly sourceLocationId: GameLocationId,
        private readonly targetLocationId: GameLocationId,
        private readonly walkTime: number) {   
    }

    public perform(game: Game): void {
        game.movePlayer(this.targetLocationId);
        game.Journal.write(game, new ChangedLocationJournalMessage(this.sourceLocationId, this.targetLocationId));
        game.processTimePassed(this.walkTime);
    }
}
