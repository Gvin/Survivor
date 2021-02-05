import { Game } from "../game";
import { LocalizableString } from "../localizable-string";

export interface GameLocationAction {

    getTitle(): LocalizableString;

    getDescription(): LocalizableString;

    Time: number;

    perform(game: Game): void;
}
