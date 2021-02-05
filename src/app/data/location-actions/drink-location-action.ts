import { Game } from "../game";
import { LocalizableString } from "../localizable-string";
import { WaterType } from "../mementos/game-location-memento";
import { DrinkOnLocationPlayerAction } from "../player-actions/drink-on-location-player-action";
import { GameLocationAction } from "./game-location-action";

const drinkTime = 1;

export class DrinkLocationAction implements GameLocationAction {
    constructor(private waterSource: WaterType) {
    }

    public getTitle(): LocalizableString {
        return new LocalizableString().addLocalizable('location-actions.drink.title', undefined, [`${drinkTime}`]);
    }

    public getDescription(): LocalizableString {
        return new LocalizableString().addLocalizable('location-actions.drink.tooltip', undefined, [`${drinkTime}`]);
    }

    public get Time(): number {
        return drinkTime;
    }

    public perform(game: Game): void {
        game.performAction(new DrinkOnLocationPlayerAction(this.waterSource, drinkTime));
    }
}
