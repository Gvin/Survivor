import { Game } from "../game";
import { GameMap } from "../game-map";
import { LocationUnlockedJournalMessage } from "../journal-messages/location-unlocked-journal-message";
import { SearchOnLocationJournalMessage } from "../journal-messages/searched-on-location-journal-message";
import { GameLocationId, GameLocationSearchResult } from "../mementos/game-location-memento";
import { GameSearchResult } from "../mementos/game-memento";
import { PlayerAction } from "./player-action";

export class SearchOnLocationPlayerAction implements PlayerAction {

    public constructor(private readonly searchResults: GameLocationSearchResult[],
        private readonly searchTime: number) {
    }

    public perform(game: Game): void {
        const locationsSearchResults = this.generateLocationsSearchResults(game.Map);
        const itemsSearchResults = this.generateItemsSearchResults();
        game.SearchResults = itemsSearchResults.length > 0 ? itemsSearchResults : undefined;
        game.processTimePassed(this.searchTime);

        const itemsCount = itemsSearchResults.reduce((count, result) => count + result.count, 0);
        game.Journal.write(game, new SearchOnLocationJournalMessage(itemsCount));

        locationsSearchResults.forEach(location => {
            game.Map.unlockLocation(location);
            game.Journal.write(game, new LocationUnlockedJournalMessage(location));
        });
    }

    private generateLocationsSearchResults(map: GameMap): GameLocationId[] {
        return this.searchResults
            .filter(result =>
                result.locationReward &&
                this.checkChance(result.chance) &&
                map.isLocationLocked(result.locationReward))
            .map(result => {
                if (!result.locationReward) {
                    throw Error('Unable to calculare location reward for non-location search results.');
                }
                return result.locationReward;
            });
    }

    private generateItemsSearchResults(): GameSearchResult[] {
        return this.searchResults
            .filter(result => 
                result.itemReward && 
                result.itemReward.totalCount >= result.itemReward.minCount && 
                this.checkChance(result.chance))
            .map(result => {
                if (!result.itemReward) {
                    throw Error('Unable to calculare item reward for non-item search results.');
                }
                const count = this.generateCount(result.itemReward.minCount, Math.min(result.itemReward.totalCount, result.itemReward.maxCount));
                result.itemReward.totalCount -= count;
                return {
                    itemId: result.itemReward.itemId,
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
