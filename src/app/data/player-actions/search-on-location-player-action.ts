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
        const itemsCount = searchResults.reduce((count, result) => count + result.count, 0);
        game.Journal.write(game, new SearchOnLocationJournalMessage(itemsCount));
    }

    private generateSearchResults(): GameSearchResult[] {
        return this.searchResults
            .filter(result => result.totalCount >= result.minCount && this.checkChance(result.chance))
            .map(result => {
                const count = this.generateCount(result.minCount, Math.min(result.totalCount, result.maxCount));
                result.totalCount -= count;
                return {
                    itemId: result.itemId,
                    count: count
                };
            });
    }

    private generateCount(min: number, max: number): number {
        const delta = max - min;
        return Math.round(min + Math.random() * delta);
    }

    private checkChance(chance: number): boolean {
        const value = Math.random() * 100;
        return value <= chance;
    }
}
