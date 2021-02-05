import { Game } from "../game";
import { LocalizableString } from "../localizable-string";
import { GameLocationActionMemento } from "../mementos/game-location-memento";

export interface GameLocationAction {

    getTitle(): LocalizableString;

    getDescription(): LocalizableString;

    Time: number;

    perform(game: Game): void;

    getMemento(): GameLocationActionMemento;
}
