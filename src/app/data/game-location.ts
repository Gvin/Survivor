import { LocaleNamespace } from "../services/game-localization/localization.service";
import { LocalizableString } from "./localizable-string";
import { GameLocationAction } from "./location-actions/game-location-action";
import { LocationActionsFactory } from "./location-actions/location-actions-factory";
import { GameLocationId, GameLocationMemento } from "./mementos/game-location-memento";

export class GameLocation {
    private readonly id: GameLocationId;
    private readonly actions: GameLocationAction[];

    constructor(memento: GameLocationMemento) {
        this.id = memento.id;
        const actionsFactory = new LocationActionsFactory();
        this.actions = memento.actions?.map(actionMemento => actionsFactory.createLocationAction(actionMemento)) ?? [];
    }

    public getMemento(): GameLocationMemento {
        return {
            id: this.id,
            actions: this.actions.map(action => action.getMemento())
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
