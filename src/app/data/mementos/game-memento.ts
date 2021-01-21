import { GameEnvironmentMemento } from "./game-environment-memento";
import { GameJournalMemento } from "./game-journal-memento";
import { GameMapMemento } from "./game-map-memento";
import { PlayerMemento } from "./player-memento";

export interface GameMemento {
    player: PlayerMemento;
    environment: GameEnvironmentMemento;
    map: GameMapMemento;
    journal: GameJournalMemento;
    currentLocation: string;
}
