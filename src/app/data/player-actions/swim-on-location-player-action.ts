import { Game } from "../game";
import { SwimOnLocationJournalMessage } from "../journal-messages/swim-on-location-journal-message";
import { WaterType } from "../mementos/game-location-memento";
import { StatsEffectPlayerAction } from "./stats-effect-player-action";

export class SwimOnLocationPlayerAction extends StatsEffectPlayerAction {
    constructor(private waterSource: WaterType, private swimTime: number) {
        super();
    }

    public perform(game: Game): void {
        switch (this.waterSource) {
            case WaterType.clean:
                this.applyStatEffect(game.Player, 'thirst', -10);
                this.applyStatEffect(game.Player, 'hunger', 3);
                this.applyStatEffect(game.Player, 'energy', -3);
                break;
            case WaterType.dirty:
                this.applyStatEffect(game.Player, 'thirst', -5);
                this.applyStatEffect(game.Player, 'hunger', 3);
                this.applyStatEffect(game.Player, 'energy', -3);
                break;
            case WaterType.sea:
                this.applyStatEffect(game.Player, 'thirst', 10);
                this.applyStatEffect(game.Player, 'hunger', 3);
                this.applyStatEffect(game.Player, 'energy', -3);
                break;
            default:
                throw Error(`Unknown water type: ${this.waterSource}.`);
        }
        
        game.processTimePassed(this.swimTime);
        game.Journal.write(game, new SwimOnLocationJournalMessage());
    }
}
