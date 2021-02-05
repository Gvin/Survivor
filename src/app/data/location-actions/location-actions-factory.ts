import { GameLocationActionMemento } from "../mementos/game-location-memento";
import { DrinkLocationAction } from "./drink-location-action";
import { GameLocationAction } from "./game-location-action";
import { SwimLocationAction } from "./swim-location-action";

export class LocationActionsFactory {
    public createLocationAction(memento: GameLocationActionMemento): GameLocationAction {
        switch (memento.type) {
            case 'drink':
                return new DrinkLocationAction(memento);
            case 'swim':
                return new SwimLocationAction(memento);
            default:
                throw Error(`Unknown location action type: ${memento.type}.`);
        }
    }
}
