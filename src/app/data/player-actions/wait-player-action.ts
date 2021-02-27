import { Game } from "../game";
import { WaitedJournalMessage } from "../journal-messages/waited-journal-message";
import { PlayerAction } from "./player-action";

export class WaitPlayerAction implements PlayerAction {
    public constructor(private readonly time: number) {
    }

    public perform(game: Game): void {
        game.processTimePassed(this.time);
        game.Journal.write(game, new WaitedJournalMessage(this.time));
    }
}
