import { Game } from "../game";
import { DrinkOnLocationJournalMessage } from "../journal-messages/drink-on-location-journal-message";
import { WaterType } from "../mementos/game-location-memento";
import { StatsEffectPlayerAction } from "./stats-effect-player-action";

export class DrinkOnLocationPlayerAction extends StatsEffectPlayerAction {
    constructor(private waterSource: WaterType, private drinkTime: number) {
        super();
    }

    public perform(game: Game): void {
        switch (this.waterSource) {
            case WaterType.clean:
                this.applyStatEffect(game.Player, 'thirst', -20);
                break;
            case WaterType.dirty:
                this.applyStatEffect(game.Player, 'thirst', -15);
                this.applyStatEffect(game.Player, 'health', -1);
                break;
            case WaterType.sea:
                this.applyStatEffect(game.Player, 'thirst', 10);
                this.applyStatEffect(game.Player, 'health', -2);
                break;
            default:
                throw Error(`Unknown water type: ${this.waterSource}.`);
        }

        game.processTimePassed(this.drinkTime);
        game.Journal.write(game, new DrinkOnLocationJournalMessage());
    }
}
