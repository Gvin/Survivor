import { GameEnvironment as GameEnvironment } from "./game-environment";
import { GameMemento } from "./mementos/game-memento";
import { Player } from "./player";
import { Map as GameMap } from "./game-map";
import { GameJournal } from "./game-journal";
import { ItemCreationService } from "../services/item-creation/item-creation.service";
import { LocalizationService } from "../services/game-localization/localization.service";

export class Game {
    private player: Player;
    private currentLocation: string;
    private environment: GameEnvironment;
    private map: GameMap;
    private journal: GameJournal;

    constructor(data: GameMemento, itemCreationService: ItemCreationService, localizationService: LocalizationService) {
        this.player = new Player(data.player, itemCreationService);
        this.currentLocation = data.currentLocation;
        this.environment = new GameEnvironment(data.environment);
        this.map = new GameMap(data.map);
        this.journal = new GameJournal(data.journal, localizationService);
    }

    public get Player(): Player {
        return this.player;
    }

    public get CurrentLocation(): string {
        return this.currentLocation;
    }

    public movePlayer(newLocation: string): void {
        this.currentLocation = newLocation;
    }

    public processTimePassed(minutes: number): void {
        this.environment.addTime(minutes);
        this.player.processTimePassed(this, minutes);
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
            journal: this.journal.getMemento()
        }
    }
}
