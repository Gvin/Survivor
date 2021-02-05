import { Game } from "../game";
import { GameLocation } from "../game-location";
import { ChangedLocationJournalMessage } from "../journal-messages/changed-location-journal-message";
import { PlayerAction } from "./player-action";

export class ChangeLocationPlayerAction implements PlayerAction {
    constructor(
        private readonly sourceLocation: GameLocation,
        private readonly targetLocation: GameLocation,
        private readonly walkTime: number) {   
    }

    public perform(game: Game): void {
        game.movePlayer(this.targetLocation);
        game.Journal.write(game, new ChangedLocationJournalMessage(this.sourceLocation, this.targetLocation));
        game.processTimePassed(this.walkTime);
    }
}
