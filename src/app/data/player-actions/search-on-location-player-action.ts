import { Game } from "../game";
import { SearchOnLocationJournalMessage } from "../journal-messages/searched-on-location-journal-message";
import { GameLocationSearchResult } from "../mementos/game-location-memento";
import { GameSearchResult } from "../mementos/game-memento";
import { PlayerAction } from "./player-action";

export class SearchOnLocationPlayerAction implements PlayerAction {

    public constructor(private readonly searchResults: GameLocationSearchResult[],
        private readonly searchTime: number) {
    }

    public perform(game: Game): void {
        const searchResults = this.generateSearchResults();
        game.SearchResults = searchResults.length > 0 ? searchResults : undefined;
        game.processTimePassed(this.searchTime);
        game.Journal.write(game, new SearchOnLocationJournalMessage(searchResults.length));
    }

    private generateSearchResults(): GameSearchResult[] {
        return this.searchResults
            .filter(result => result.totalCount >= result.count && this.checkChance(result.chance))
            .map(result => {
                result.totalCount -= result.count;
                return {
                    itemId: result.itemId,
                    count: result.count
                };
            });
    }

    private checkChance(chance: number): boolean {
        const value = Math.random() * 100;
        return value <= chance;
    }
}
