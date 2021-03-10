import { LocaleNamespace } from "../services/game-localization/localization.service";
import { LocalizableString } from "./localizable-string";
import { GameLocationId } from "./mementos/game-location-memento";

export class GameLocationNameProvider {
    public static getTitle(locationId: GameLocationId): LocalizableString {
        return new LocalizableString().addLocalizable(`${locationId}.title`, LocaleNamespace.locations);
    }
}
