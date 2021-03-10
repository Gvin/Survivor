import { Game } from "../game";
import { LocalizableString } from "../localizable-string";
import { GameLocationSearchResult } from "../mementos/game-location-memento";
import { SearchOnLocationPlayerAction } from "../player-actions/search-on-location-player-action";
import { GameLocationAction } from "./game-location-action";

const searchTime = 60;

export class SearchLocationAction implements GameLocationAction {

    public constructor(private readonly searchResults: GameLocationSearchResult[]) {
    }

    public getTitle(): LocalizableString {
        return new LocalizableString().addLocalizable('location-actions.search.title', undefined, [`${this.Time}`]);
    }

    public getDescription(): LocalizableString {
        return new LocalizableString().addLocalizable('location-actions.search.tooltip', undefined, [`${this.Time}`]);
    }

    public get Time(): number {
        return searchTime;
    }

    public perform(game: Game): void {
        game.performAction(new SearchOnLocationPlayerAction(this.searchResults, this.Time));
    }
}