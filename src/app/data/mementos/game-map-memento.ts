import { GameLocationMemento } from "./game-location-memento";

export interface GameMapMemento {
    locations: GameLocationMemento[];
    connections: GameLocationConnection[]
}

export interface GameLocationConnection {
    locationA: string;
    locationB: string;
    walkTime: number;
}
