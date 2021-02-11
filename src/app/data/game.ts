import { GameEnvironment as GameEnvironment } from "./game-environment";
import { GameMemento } from "./mementos/game-memento";
import { Player } from "./player";
import { Map as GameMap } from "./game-map";
import { GameJournal } from "./game-journal";
import { ItemCreationService } from "../services/item-creation/item-creation.service";
import { LocalizationService } from "../services/game-localization/localization.service";
import { PlayerAction } from "./player-actions/player-action";
import { EventEmitter } from "events";
import { GameLocation } from "./game-location";

export class Game {
    private player: Player;
    private currentLocation: string;
    private environment: GameEnvironment;
    private map: GameMap;
    private journal: GameJournal;

    public readonly actionPerformed: EventEmitter;

    constructor(data: GameMemento, itemCreationService: ItemCreationService, localizationService: LocalizationService) {
        this.player = new Player(data.player, itemCreationService);
        this.currentLocation = data.currentLocation;
        this.environment = new GameEnvironment(data.environment);
        this.map = new GameMap(data.map, itemCreationService);
        this.journal = new GameJournal(data.journal, localizationService);

        this.actionPerformed = new EventEmitter();
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
            journal: this.journal.getMemento()
        }
    }
}
