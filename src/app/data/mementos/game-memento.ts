import { GameBuildingRecipeMemento } from "./game-building-recipe-memento";
import { GameEnvironmentMemento } from "./game-environment-memento";
import { GameJournalMemento } from "./game-journal-memento";
import { GameMapMemento } from "./game-map-memento";
import { GameRecipeMemento } from "./game-recipe-memento";
import { PlayerMemento } from "./player-memento";

export interface GameSearchResult {
    itemId: string;
    count: number;
}

export interface GameMemento {
    player: PlayerMemento;
    environment: GameEnvironmentMemento;
    map: GameMapMemento;
    journal: GameJournalMemento;
    currentLocation: string;
    recipes: GameRecipeMemento[];
    buildingRecipes: GameBuildingRecipeMemento[];
    searchResults?: GameSearchResult[];
}
