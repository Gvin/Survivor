import { GameEnvironment as GameEnvironment } from "./game-environment";
import { GameMemento } from "./mementos/game-memento";
import { Player } from "./player";
import { Map as GameMap } from "./game-map";
import { PlayerAction } from "./player-actions/player-action";
import { GameJournal } from "./game-journal";
import { ItemCreationService } from "../services/item-creation/item-creation.service";

export class Game {
    private player: Player;
    private currentLocation: string;
    private environment: GameEnvironment;
    private map: GameMap;
    private journal: GameJournal;

    constructor(data: GameMemento, itemCreationService: ItemCreationService) {
        this.player = new Player(data.player, itemCreationService);
        this.currentLocation = data.currentLocation;
        this.environment = new GameEnvironment(data.environment);
        this.map = new GameMap(data.map);
        this.journal = new GameJournal(data.journal);
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

    public performAction(action: PlayerAction): void {
        const minutesPassed = action.perform(this);
        this.environment.addTime(minutesPassed);
        this.processTimePassed(minutesPassed);
    }

    private processTimePassed(minutes: number): void {
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
