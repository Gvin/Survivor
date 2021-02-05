import { Game } from "../game";
import { DrinkOnLocationJournalMessage } from "../journal-messages/drink-on-location-journal-message";
import { DrinkLocationAction } from "../location-actions/drink-location-action";
import { StatsEffectPlayerAction } from "./stats-effect-player-action";

export class DrinkOnLocationPlayerAction extends StatsEffectPlayerAction {
    constructor(private locationAction: DrinkLocationAction) {
        super();
    }

    public perform(game: Game): void {
        this.locationAction.getEffects().forEach(effect => {
            this.applyStatEffect(game.Player, effect.key, Number(effect.value));
        })
        game.processTimePassed(this.locationAction.Time);
        game.Journal.write(game, new DrinkOnLocationJournalMessage());
    }
}
