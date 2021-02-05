import { Game } from "../game";
import { SwimOnLocationJournalMessage } from "../journal-messages/swim-on-location-journal-message";
import { SwimLocationAction } from "../location-actions/swim-location-action";
import { StatsEffectPlayerAction } from "./stats-effect-player-action";

export class SwimOnLocationPlayerAction extends StatsEffectPlayerAction {
    constructor(private locationAction: SwimLocationAction) {
        super();
    }

    public perform(game: Game): void {
        this.locationAction.getEffects().forEach(effect => {
            this.applyStatEffect(game.Player, effect.key, Number(effect.value));
        })
        game.processTimePassed(this.locationAction.Time);
        game.Journal.write(game, new SwimOnLocationJournalMessage());
    }
}
