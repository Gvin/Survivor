import { GameEnvironment as GameEnvironment } from "./game-environment";
import { GameMemento, GameSearchResult } from "./mementos/game-memento";
import { Player } from "./player";
import { GameMap as GameMap } from "./game-map";
import { GameJournal } from "./game-journal";
import { ItemCreationFactory } from "./items/item-creation/item-creation-factory";
import { PlayerAction } from "./player-actions/player-action";
import { EventEmitter } from "events";
import { GameLocation } from "./game-location";
import { GameRecipeMemento } from "./mementos/game-recipe-memento";
import { RecipeUnlockedJournalMessage } from "./journal-messages/recipe-unlocked-journal-message";

export class Game {
    private player: Player;
    private currentLocation: GameLocation;
    private environment: GameEnvironment;
    private map: GameMap;
    private journal: GameJournal;
    private recipes: GameRecipeMemento[];
    private searchResults?: GameSearchResult[];

    public readonly actionPerformed: EventEmitter;

    constructor(memento: GameMemento, private readonly itemCreationFactory: ItemCreationFactory) {
        this.player = new Player(memento.player, itemCreationFactory);
        this.environment = new GameEnvironment(memento.environment);
        this.map = new GameMap(memento.map, itemCreationFactory);
        this.currentLocation = this.map.getLocation(memento.currentLocation);
        this.journal = new GameJournal(memento.journal);
        this.recipes = memento.recipes;
        this.searchResults = memento.searchResults;

        this.actionPerformed = new EventEmitter();
    }

    public get ItemsFactory(): ItemCreationFactory {
        return this.itemCreationFactory;
    }

    public get Player(): Player {
        return this.player;
    }

    public get CurrentLocation(): GameLocation {
        return this.currentLocation;
    }

    public movePlayer(newLocation: GameLocation): void {
        this.currentLocation = this.map.getLocation(newLocation.Id);
    }

    public processTimePassed(minutes: number): void {
        this.environment.addTime(minutes);
        this.map.processTimePassed(minutes);
        this.player.processTimePassed(this, minutes);
    }

    public performAction(action: PlayerAction): void {
        action.perform(this);
        this.checkRecipesUnlock();
        this.actionPerformed.emit('action');
    }

    private checkRecipesUnlock(): void {
        this.recipes.filter(recipe => !recipe.unlocked).forEach(recipe => {
            if (!recipe.unlock) {
                recipe.unlocked = true;
            } else {
                const canUnlockByItems = recipe.unlock.knownItems ? this.player.isKnownItems(recipe.unlock.knownItems) : true;
                if (canUnlockByItems) {
                    recipe.unlocked = true;
                    this.journal.write(this, new RecipeUnlockedJournalMessage(recipe));
                }
            }
        });
    }

    public get Recipes(): GameRecipeMemento[] {
        return this.recipes;
    }

    public get Environment(): GameEnvironment {
        return this.environment;
    }

    public get Map(): GameMap {
        return this.map;
    }

    public get Journal(): GameJournal {
        return this.journal;
    }

    public get SearchResults(): GameSearchResult[] | undefined {
        return this.searchResults;
    }

    public set SearchResults(searchResults: GameSearchResult[] | undefined) {
        this.searchResults = searchResults;
    }

    public getMemento(): GameMemento {
        return {
            player: this.player.getMemento(),
            currentLocation: this.currentLocation.Id,
            environment: this.environment.getMemento(),
            map: this.map.getMemento(),
            journal: this.journal.getMemento(),
            recipes: this.recipes,
            searchResults: this.searchResults
        }
    }
}
