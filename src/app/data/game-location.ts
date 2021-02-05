import { LocaleNamespace } from "../services/game-localization/localization.service";
import { LocalizableString } from "./localizable-string";
import { DrinkLocationAction } from "./location-actions/drink-location-action";
import { GameLocationAction } from "./location-actions/game-location-action";
import { SwimLocationAction } from "./location-actions/swim-location-action";
import { GameLocationId, GameLocationMemento, WaterType } from "./mementos/game-location-memento";

export class GameLocation {
    private readonly id: GameLocationId;
    private readonly canSwim?: boolean;
    private readonly waterSource?: WaterType;
    private readonly actions: GameLocationAction[];

    constructor(memento: GameLocationMemento) {
        this.id = memento.id;
        this.canSwim = memento.canSwim;
        this.waterSource = memento.waterSource;
        this.actions = this.generateLocationActions();
    }

    private generateLocationActions(): GameLocationAction[] {
        const result: GameLocationAction[] = [];

        if (this.waterSource) {
            result.push(new DrinkLocationAction(this.waterSource));
        }
        if (this.waterSource && this.canSwim) {
            result.push(new SwimLocationAction(this.waterSource));
        }

        return result;
    }

    public getMemento(): GameLocationMemento {
        return {
            id: this.id,
            canSwim: this.canSwim,
            waterSource: this.waterSource
        }
    }

    public get Id(): GameLocationId {
        return this.id;
    }

    public get Actions(): GameLocationAction[] {
        return this.actions;
    }

    public get Title(): LocalizableString {
        return new LocalizableString().addLocalizable(`${this.id}.title`, LocaleNamespace.locations);
    }

    public get Description(): LocalizableString {
        return new LocalizableString().addLocalizable(`${this.id}.description`, LocaleNamespace.locations);
    }
}
