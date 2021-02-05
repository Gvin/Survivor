import { Game } from "../game";
import { LocalizableString } from "../localizable-string";
import { WaterType } from "../mementos/game-location-memento";
import { SwimOnLocationPlayerAction } from "../player-actions/swim-on-location-player-action";
import { GameLocationAction } from "./game-location-action";

const swimTime = 10;

export class SwimLocationAction implements GameLocationAction {
    constructor(private waterSource: WaterType) {
    }

    public getTitle(): LocalizableString {
        return new LocalizableString().addLocalizable('location-actions.swim.title', undefined, [`${swimTime}`]);
    }

    public getDescription(): LocalizableString {
        return new LocalizableString().addLocalizable('location-actions.swim.tooltip', undefined, [`${swimTime}`]);
    }

    public get Time(): number {
        return swimTime;
    }

    public perform(game: Game): void {
        game.performAction(new SwimOnLocationPlayerAction(this.waterSource, swimTime));
    }
}
