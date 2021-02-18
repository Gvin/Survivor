import { GameEnvironment as GameEnvironment } from "./game-environment";
import { GameMemento } from "./mementos/game-memento";
import { Player } from "./player";
import { Map as GameMap } from "./game-map";
import { GameJournal } from "./game-journal";
import { ItemCreationFactory } from "./items/item-creation/item-creation-factory";
import { LocalizationService } from "../services/game-localization/localization.service";
import { PlayerAction } from "./player-actions/player-action";
import { EventEmitter } from "events";
import { GameLocation } from "./game-location";
import { GameRecipeMemento } from "./mementos/game-recipe-memento";

export class Game {
    private player: Player;
    private currentLocation: string;
    private environment: GameEnvironment;
    private map: GameMap;
    private journal: GameJournal;
    private recipes: GameRecipeMemento[];

    public readonly actionPerformed: EventEmitter;

    constructor(memento: GameMemento, private readonly itemCreationFactory: ItemCreationFactory, localizationService: LocalizationService) {
        this.player = new Player(memento.player, itemCreationFactory);
        this.currentLocation = memento.currentLocation;
        this.environment = new GameEnvironment(memento.environment);
        this.map = new GameMap(memento.map, itemCreationFactory);
        this.journal = new GameJournal(memento.journal, localizationService);
        this.recipes = memento.recipes;

        this.actionPerformed = new EventEmitter();
    }

    public get ItemsFactory(): ItemCreationFactory {
        return this.itemCreationFactory;
    }

    public get Player(): Player {
        return this.player;
    }

    public get CurrentLocation(): string {
        return this.currentLocation;
    }

    public movePlayer(newLocation: GameLocation): void {
        this.currentLocation = newLocation.Id;
    }

    public processTimePassed(minutes: number): void {
        this.environment.addTime(minutes);
        this.player.processTimePassed(this, minutes);
    }

    public performAction(action: PlayerAction): void {
        action.perform(this);
        this.actionPerformed.emit('action');
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

    public getMemento(): GameMemento {
        return {
            player: this.player.getMemento(),
            currentLocation: this.currentLocation,
            environment: this.environment.getMemento(),
            map: this.map.getMemento(),
            journal: this.journal.getMemento(),
            recipes: this.recipes
        }
    }
}
